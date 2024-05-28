"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = () => {
    return crypto_1.default.randomBytes(20).toString('hex');
};
const sendConfirmationEmail = (user, token) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });
    const mailOptions = {
        from: 'confirm chatterbox',
        to: user.email,
        subject: 'Confirm your email for Chatterbox',
        text: `Please confirm your email for Chatterbox account activation by following ${process.env.API_INSTANCE_URL}${process.env.API_CONFIRM_EMAIL_ENDPOINT}${token}`
    };
    try {
        yield transporter.sendMail(mailOptions);
    }
    catch (e) {
        console.log(e.message);
        throw new Error('Failed to send confirmation email');
    }
});
exports.default = { generateToken, sendConfirmationEmail };
