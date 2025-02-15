const express = require('express');
const { insertSample ,getProductStats,getProductAnalysis } = require('../controller/product-controller');

const router = express.Router();

router.post("/add", insertSample);
router.get("/stats", getProductStats);
router.get("/analysis",getProductAnalysis);

module.exports = router;
