const express = require('express');
const router = express.Router();
const User = require('./models/user')

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});;

router.get('/api/user', (req, res, next) => {
    res.json({ buenas: 'hola' })
})

router.post('/api/users', async (req, res, next) => {
    const { username } = req.body;
    const newUser = new User();
    newUser.username = username;
    const savedUser = await newUser.save();
    const jsonRes = {
        username: savedUser.username,
        id: savedUser.id
    }
    return res.json(jsonRes)
})

module.exports = router;