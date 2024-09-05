const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// signup controller
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    const role = email.endsWith('@alphaware.com') || email.endsWith('@alphawarenext.com') ? 'admin' : 'user';

    try {
        const user = await User.create({ name, email, password, role });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: 'Error signing up' });
    }
};

// login controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};
