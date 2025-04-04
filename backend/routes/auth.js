const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST: Register a new user
router.post('/register', async (req, res) => {
    try {
        console.log("Incoming Request to /register:", req.body); // Log request body
        
        const { name, email, password } = req.body;
        
        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Generate a JSON Web Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        console.log("User Registered:", user);

        // Respond with the token
        res.status(201).json({ name: user.name, token: token });

    } catch (error) {
        console.error("Registration Error:", error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST: Login
router.post('/login', async (req, res) => {
    try {
        console.log("Incoming Request to /login:", req.body);

        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Email' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        console.log("User Logged In:", user.name);

        res.status(200).json({ name: user.name, token: token });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
