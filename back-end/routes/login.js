import express from 'express';
const router = express.Router();
const jwt = require('jsonwebtoken');

// Import User model
import User from '../models/user';

// Hash Password
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async(req, res) => {
    const body = req.body;
    try {
        const userDB = await User.findOne({ email: body.email })

        // Evaluate email
        if(!userDB){
            return res.status(400).json({
                message: 'Email has not been found'
            })
        }

        // Evaluate password
        if(!bcrypt.compareSync(body.password, userDB.password)){
            return res.status(400).json({
                message: 'Invalid password'
            })
        }

        // Generate Token
        const token = jwt.sign({
            data: userDB
        }, 'secret', { expiresIn: 60 * 60 * 24 * 30 });

        res.json({
            userDB,
            token  
        })
    } catch (error) {
        return res.status(400).json({
            message: 'An error has occurred',
            error
        })
    }
})

module.exports = router;