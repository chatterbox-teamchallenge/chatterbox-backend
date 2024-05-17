"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = express_1.default.Router();
router.post('/signup', UserController_1.default.signup);
router.post('/login', UserController_1.default.login);
router.put('/updatePassword', UserController_1.default.updatePassword);
exports.default = router;
