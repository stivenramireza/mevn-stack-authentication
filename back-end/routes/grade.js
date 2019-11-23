import express from 'express';
const router = express.Router();

// import Grade model
import Grade from '../models/grade';

const { verifyAuth, verifyAdmin } = require('../middlewares/auth');

// Add a grade
router.post('/new-grade', verifyAuth, async(req, res) => {
    const body = req.body;
    body.userId = req.user._id;
    try {
       const gradeDB = await Grade.create(body);
       res.status(200).json(gradeDB);
    } catch (error) {
        return res.status(500).json({
            message: 'An error has occurred',
            error
        })
    }
});

// Get with parameters
router.get('/grade/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const gradeDB = await Grade.findOne({ _id });
        res.json(gradeDB);
    } catch (error) {
        return res.status(400).json({
            message: 'An error has occurred',
            error
        })
    }
});

// Get all documents
router.get('/grade', verifyAuth, async(req, res) => {
    const userId = req.user._id;
    try {
        const gradesDB = await Grade.find({ userId });
        res.json(gradesDB);
    } catch (error) {
        return res.status(400).json({
            message: 'An error has occurred',
            error
        })
    }
})

// Delete a grade
router.delete('/grade/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const gradeDB = await Grade.findByIdAndDelete({ _id });
        if(!gradeDB){
            return res.status(400).json({
                message: 'This _id has not found',
                error
            })
        }
        res.json(gradeDB);
    } catch (error) {
        return res.status(400).json({
            message: 'An error has occurred',
            error
        })
    }
})

// Update a grade
router.put('/grade/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const gradeDB = await Grade.findByIdAndUpdate(_id, body, {new: true});
        res.json(gradeDB);
    } catch (error) {
        return res.status(400).json({
            message: 'An error has occurred',
            error
        })
    }
})

module.exports = router;