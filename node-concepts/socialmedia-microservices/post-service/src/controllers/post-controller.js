const logger = require("../utils/loggers");
const Post = require("../models/post");
const { validateCreatePost } = require("../utils/validation");
const { publishEvent } = require("../utils/rabbitmq");

async function invalidatePostCache(req, input) {
    const cachedKey = `post:${input}`;
    await req.redisClient.del(cachedKey);
  
    const keys = await req.redisClient.keys("posts:*");
    if (keys.length > 0) {
      await req.redisClient.del(keys);
    }
  }


// const createpost = async (req, res) => {
//     try {
//         const {content , mediaIds } = req.body;
//         const newlyCreatedPost = new Post({
//             user : req.user._id,
//             content,
//             mediaIds : mediaIds || []
//         });

//         await newlyCreatedPost.save();
//         logger.info('Post created successfully', newlyCreatedPost);
//         res.status(201).json({
//             message : 'Post created successfully',
//             success: true,
//             data : newlyCreatedPost
//         });

//     }
//     catch(e){
//         logger.error('Error in creating post', e);
//         res.status(500).json({
//             message : 'Internal server error',
//             success: false
//         });

//     }
// }

const createPost = async (req, res) => {
    logger.info("Create post endpoint hit");
    try {
      //validate the schema
      const { error } = validateCreatePost(req.body);
      if (error) {
        logger.warn("Validation error", error.details[0].message);
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }
      const { content, mediaIds } = req.body;
      const newlyCreatedPost = new Post({
        user: req.user.userId,
        content,
        mediaIds: mediaIds || [],
      });
  
      await newlyCreatedPost.save();
  
      await publishEvent("post.created", {
        postId: newlyCreatedPost._id.toString(),
        userId: newlyCreatedPost.user.toString(),
        content: newlyCreatedPost.content,
        createdAt: newlyCreatedPost.createdAt,
      });
  
      await invalidatePostCache(req, newlyCreatedPost._id.toString());
      logger.info("Post created successfully", newlyCreatedPost);
      res.status(201).json({
        success: true,
        message: "Post created successfully",
      });
    } catch (e) {
      logger.error("Error creating post", error);
      res.status(500).json({
        success: false,
        message: "Error creating post",
      });
    }
  };



const getAllPosts = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        const cacheKey = `posts:${page}:${limit}`;
        const cachedPosts = await req.redisClient.get(cacheKey);

        if (cachedPosts) {
        return res.json(JSON.parse(cachedPosts));
        }
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .skip(startIndex)
            .limit(limit);

            const totalNoOfPosts = await Post.countDocuments();

        const result = {
        posts,
        currentpage: page,
        totalPages: Math.ceil(totalNoOfPosts / limit),
        totalPosts: totalNoOfPosts,
        };

        //save
        await req.redisClient.setex(cacheKey,300,JSON.stringify(result));
        res.json(result);
    }
    catch(e){
        logger.error('error fetching posts',error);
        res.status(500).json({
            status : false,
            message : 'error fetching posts'
        });
    };
};
const getpost = async (req, res) => {
    try {
        const postId = req.params.id;
        const cacheKey = `post:${postId}`;
        const cachedPost = await req.redisClient.get(cacheKey);
        if (cachedPost) {
          return res.json(JSON.parse(cachedPost));
        }
        const singlepost = await Post.findById(postId);
        if (!singlepost) {
          return res.status(404).json({
            success: false,
            message: "Post not found",
          });
        }
        await req.redisClient.setex(cacheKey, 300, JSON.stringify(post));
        res.json(singlepost);
    }

    
    catch(e){
        logger.error('Error in get post', e);
        res.status(500).json({
            message : 'Internal server error',
            success: false
        });

    };

};


const deletepost = async (req, res) => {
    try {
        const post = await post.findOneAndDelete({ 
            _id: req.params.id,
            user: req.user._id
        });

        if (!post) {
            return res.status(404).json({
              success: false,
              message: "Post not found",
            });
        }

        //publish post delete
        await publishEvent('post.deleted', {
          postId : post._id.toString(),
          userId: req.user.userId,
          mediaIds : post.mediaIds
        })
        


        
        //check the ivalid posts
        await invalidatePostCache(req, req.params.id);
        res.status(200).json({
            message : 'Post deleted successfully',
            success: true
        });

    }
    catch(e){
        logger.error('Error in deleting post', e);
        res.status(500).json({
            message : 'Internal server error',
            success: false
        });

    }
}


module.exports = {createPost, getAllPosts, getpost, deletepost};