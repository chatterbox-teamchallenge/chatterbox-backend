/**
 * TODO: jwt token;
 */
import { Request, Response } from 'express';
import { generateFromEmail } from "unique-username-generator";
import User from '../models/User';
import PendingUser from '../models/PendingUser';
import ConfirmEmail from '../middleware/confirmEmail';

const signup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const randomUsername = generateFromEmail(email, 5);
    const confirmationToken = ConfirmEmail.generateToken();
    const pendingUser = new PendingUser({
        username: username || randomUsername,
        email,
        password,
        confirmationToken
    });

    try {
        await pendingUser.save();
        await ConfirmEmail.sendConfirmationEmail(pendingUser, confirmationToken);
        res.status(200).json({ message: 'User created successfully! Please confirm your email.' });
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};

const confirmUser = async (req: Request, res: Response) => {
    const { token } = req.params;

    try {
        const pendingUser = await PendingUser.findOne({ confirmationToken: token });
        if (!pendingUser) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        const user = new User({
            username: pendingUser.username,
            email: pendingUser.email,
            password: pendingUser.password
        });

        await user.save();
        await PendingUser.deleteOne({ confirmationToken: token });

        res.status(200).json({ message: 'Email confirmed successfully!' });
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
}

const login = async (req: Request, res: Response) => {
    const { login, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ username: login }, { email: login }] });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
};

const updatePassword = async (req: Request, res: Response) => {
    const { username, oldPassword, newPassword } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        await user.updatePassword(newPassword);
        res.status(200).json({ message: 'Password updated successfully' })
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
};

export default { signup, login, updatePassword, confirmUser };