import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import { requireAuth } from '../utils/auth';

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

router.post('/users', UsersController.postNew);

router.get('/connect', AuthController.getConnect);
router.get('/disconnect', requireAuth, AuthController.getDisconnect);
router.get('/users/me', requireAuth, UsersController.getMe);

export default router;
