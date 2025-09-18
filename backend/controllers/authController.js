import jwt from 'jsonwebtoken';

export const googleCallback = (req, res) => { // Use 'export' keyword
    const user = req.user;

    const token = jwt.sign(
        { id: user._id, name: user.displayName, image: user.image },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
};