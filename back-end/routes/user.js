import express from 'express';
const router = express.Router();

import User from '../models/user';

const bcrypt = require('bcrypt');
const saltRounds = 10;

// POST
router.post('/new-user', async(req, res) => {
    const body = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    body.password = bcrypt.hashSync(req.body.password, saltRounds);

    try {
        const userDB = await User.create(body);
        res.json(userDB);
    } catch (error) {
        return res.status(500).json({
            message: 'An error has occurred',
            error
        })
    }
});

module.exports = router;