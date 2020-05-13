const express = require('express')
const router = express.Router()


router.post('/', (req, res) => {
    const {name, qtyInStock, description, price, category} = req.body;
    //photos
})


module.exports = router