const express = require('express');


const { createpost,getAllPosts ,getpost,deletepost} = require('../controllers/post-controller');

const { authenticateRequest } = require("../middleware/authMiddleware");
//const { errorHandler } = require('../middleware/error-handler');

const router = express();

//middleware -> this will tell if the user is an auth user or not
router.use(authenticateRequest);


router.post("/create-post", createpost);
router.get("/all-posts", getAllPosts);
router.get("/:id", getpost);
router.delete("/:id", deletepost);

module.exports = router;