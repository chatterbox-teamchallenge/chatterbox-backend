import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.put('/update-pass', UserController.updatePassword);
router.get('/confirm-email/:token', UserController.confirmUser);

export default router;