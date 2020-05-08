const express = require('express')
const router = express.Router()
const person = require('./person');
const item = require('./item');
const category = require('./category');
const order = require('./order');


router.get('/', function (req, res) {
    res.send('api route')
})

router.use('/person', person);
router.use('/item', item);
router.use('/category', category);
router.use('/order', order);

module.exports = router