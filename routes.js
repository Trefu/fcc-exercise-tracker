const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});;

router.get('/api/user', (req, res, next) => {
    res.json({ buenas: 'hola' })
})

module.exports = router;