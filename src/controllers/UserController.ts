import { Request, Response } from 'express';
import { generateFromEmail } from "unique-username-generator";
import User from '../models/User';

/**
 * TODO
 * 1) email confirm & jwt token;
 */
const signup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const randomUsername = generateFromEmail(email, 5);
    const user = new User({
        username: username || randomUsername,
        email,
        password
    })

    try {
        await user.save();
        res.status(200).json({ message: 'User created successfully!' });
    } catch (e: any) {
        res.status(400).json({ message: e.message })
    }
}

/**
 * TODO
 * 1) login with email OR username;
 */
const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
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

export default { signup, login, updatePassword };