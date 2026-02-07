const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body; // destructure the request body to get username, email, and password
        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ username, email, password});
        await newUser.save();
        res.status(200).json(
            {
                status:'success',
                statusCode: 200,
                data: {
                    message: 'User registered successfully'
                }
            }
        );
     }catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;