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
const unique_username_generator_1 = require("unique-username-generator");
const User_1 = __importDefault(require("../models/User"));
const PendingUser_1 = __importDefault(require("../models/PendingUser"));
const confirmEmail_1 = __importDefault(require("../middleware/confirmEmail"));
/**
 * TODO: jwt token;
 */
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const randomUsername = (0, unique_username_generator_1.generateFromEmail)(email, 5);
    const confirmationToken = confirmEmail_1.default.generateToken();
    const pendingUser = new PendingUser_1.default({
        username: username || randomUsername,
        email,
        password,
        confirmationToken
    });
    try {
        yield pendingUser.save();
        yield confirmEmail_1.default.sendConfirmationEmail(pendingUser, confirmationToken);
        res.status(200).json({ message: 'User created successfully! Please confirm your email.' });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
});
const confirmUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    try {
        const pendingUser = yield PendingUser_1.default.findOne({ confirmationToken: token });
        if (!pendingUser) {
            return res.status(400).json({ message: 'Invalid token' });
        }
        const user = new User_1.default({
            username: pendingUser.username,
            email: pendingUser.email,
            password: pendingUser.password
        });
        yield user.save();
        yield PendingUser_1.default.deleteOne({ confirmationToken: token });
        res.status(200).json({ message: 'Email confirmed successfully!' });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ $or: [{ username: login }, { email: login }] });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful' });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
});
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, oldPassword, newPassword } = req.body;
    try {
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = yield user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        yield user.updatePassword(newPassword);
        res.status(200).json({ message: 'Password updated successfully' });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
});
exports.default = { signup, login, updatePassword, confirmUser };
