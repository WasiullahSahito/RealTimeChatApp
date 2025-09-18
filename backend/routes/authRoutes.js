import express from 'express';
import passport from 'passport';
import * as authController from '../controllers/authController.js'; // Import using named import syntax

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/', session: false }),
    authController.googleCallback // Access the exported function
);

export default router;