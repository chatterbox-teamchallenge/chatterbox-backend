import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
}

const sendConfirmationEmail = async (user: any, token: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    })

    const mailOptions = {
        from: 'confirm chatterbox',
        to: user.email,
        subject: 'Confirm your email for Chatterbox',
        text: `Please confirm your email for Chatterbox account activation by following ${process.env.API_INSTANCE_URL}confirm-email/${token}`
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (e: any) {
        console.log(e.message);
        throw new Error('Failed to send confirmation email');
    }
}

export default { generateToken, sendConfirmationEmail };