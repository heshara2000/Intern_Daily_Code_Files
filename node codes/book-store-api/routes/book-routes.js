const express = require('express');

const {getAllbook,singlebookbyid,addbook,updatebook,deletebook} = require('../controllers/book-controller');
const { get } = require('mongoose');
const router = express.Router();

//all the routes that are related to books only
router.get('/get', getAllbook);
router.get('/get/:id',singlebookbyid);

router.post('/add',addbook);
router.put('/update/:id', updatebook);
router.delete('/delete/:id', deletebook);

module.exports = router;