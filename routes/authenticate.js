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
            return res.status(400).json({ 
                status: "failure",
                statusCode: 400,
                data:{ message:'User already exists'}
             });
        }

        const randomString = await bcrypt.genSalt(6); // generate a random string to be used as salt for hashing the password
        const encodedPassword = await bcrypt.hash(password, randomString); // hash the password with a salt round of 6
        

        const newUser = new User({ username, email, password:encodedPassword});
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