const express = require('express');
const router = express.Router();
const User = require('./models/user');
const Exercise = require('./models/exercise');

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
    return
});

router.get('/api/users', async (req, res, next) => {
    const allUsers = await User.find({}, { 'exercises': 0, '__v': 0 });
    res.json(allUsers)
    return
});

router.get('/api/users/:id/logs', async (req, res, next) => {
    const { id } = req.params;
    const { from, to, limit } = req.query;
    //from to = dates in YYYY-MM-DD format
    try {
        const user = await User.findById(id);
        let logs = {};
        logs._id = user._id
        logs.username = user.username;
        logs.count = user.log.length;
        logs.log = user.log;
        if (from && to) {
            const fromDate = new Date(from);
            const toDate = new Date(to);
            logs.log = user.log.filter(exer => exer.date.getTime() >= fromDate.getTime() && exer.date.getTime() < toDate.getTime())
        }
        console.log(logs.log)
        if (limit) {
            logs.log = user.log.slice(0, limit)
            logs.count = logs.log.length
        }
        console.log(logs)
        res.json(logs)
    } catch (error) {
        res.status(500).send(error)
    }
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
    const { description, duration, date } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(500).send('no hay usuario')
        const newExercise = new Exercise();
        if (!req.body.description || !req.body.duration || isNaN(req.body.duration)) {
            return res.status(500).send('error')
        }
        newExercise.description = description;
        newExercise.duration = duration;
        date ? newExercise.date = date : newExercise.date;
        user.log.push(newExercise);
        const userSaved = await user.save();
        res.json({
            _id: userSaved.id,
            username: userSaved.username,
            date: newExercise.date.toDateString(),
            duration: newExercise.duration,
            description: newExercise.description
        });

    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;