const logger = require("../utils/logger");


const searchPostController = async (req, res) => {
    logger.info("Create search endpoint hit");
    try {
     
      const {query} = req.query;

      const results = await search.find({
        $text: { $search: query },
      },
      { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } })
      .limit(10);

      res.json({
        success: true,
        data: results,
      });

     
      
    } catch (e) {
      logger.error("Error searching post", error);
      res.status(500).json({
        success: false,
        message: "Error searching post",
      });
    }
  };


module.exports = {searchPostController};