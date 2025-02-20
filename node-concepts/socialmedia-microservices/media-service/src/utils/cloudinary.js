const cloudinary = require("cloudinary").v2;
const logger = require("./loggers");



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const uploadMedia = async (file) => {
    return new Promise((resolve,reject)=> {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
            },
            (error, result) => {
                if (error) {
                    logger.error(`Error uploading file to cloudinary: ${error}`);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
    
);
uploadStream.end(file.buffer);
}
)};

const deleteMediaFromCloudinary = async (publicId) => {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      logger.info("Media deleted successfuly from cloud stroage", publicId);
      return result;
    } catch (error) {
      logger.error("Error deleting media from cludinary", error);
      throw error;
    }
  };

module.exports = { uploadMedia,deleteMediaFromCloudinary };