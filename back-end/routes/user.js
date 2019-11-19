import express from 'express';
const router = express.Router();

import User from '../models/user';

const { verifyAuth, verifyAdmin } = require('../middlewares/auth')

// Hash Password
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Filter fields of PUT
const _ = require('underscore');

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

// PUT
router.put('/user/:id', [verifyAuth, verifyAdmin], async(req, res) => {
    const _id = req.params.id;
    const body = _.pick(req.body, ['name', 'email', 'password', 'active']);

    if(body.password){
        body.password = bcrypt.hashSync(req.body.password, saltRounds);
    }
    try {
        const userDB = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true});
        res.json(userDB);
    } catch (error) {
        return res.status(400).json({
            message: 'An error has occurred',
            error
        })
    }
})

module.exports = router;