const express = require('express');
const router = express.Router();
const User = require('./models/user');
const Exercise = require('./models/exercise');

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
    return
});;

router.get('/api/users', async (req, res, next) => {
    const allUsers = await User.find({}, { 'exercises': 0, '__v': 0 });
    res.json(allUsers)
    return
})

router.post('/api/users', async (req, res, next) => {
    const { username } = req.body;
    const newUser = new User();
    newUser.username = username;
    const savedUser = await newUser.save();
    const jsonRes = {
        username: savedUser.username,
        _id: savedUser.id
    }
    return res.json(jsonRes)
})

router.post('/api/users/:id/exercises', async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(500).send('no hay usuario')
        const newExercise = new Exercise();
        if (!req.body.description || !req.body.duration || isNaN(req.body.duration)) {
            return res.status(500).send('error')
        }
        newExercise.description = req.body.description;
        newExercise.duration = req.body.duration;
        req.body.date ? newExercise.date = req.body.date : newExercise.date;
        user.exercises.push(newExercise);
        const userSaved = await user.save();
        res.json({
            _id: userSaved.id,
            username: userSaved.username,
            date: newExercise.date,
            duration: newExercise.duration,
            description: newExercise.description
        });

    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;