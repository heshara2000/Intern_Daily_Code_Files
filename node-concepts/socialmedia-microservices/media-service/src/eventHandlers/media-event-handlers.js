const Media = require("../models/Media");
const { deleteMediaFromCloudinary } = require("../utils/cloudinary");
const logger = require("../utils/loggers");


const handlePostDeleted = async(event) => {
    console.log(event,"eventttt");
    const {mediaId,postId} = event;
    try{
        const media = await media.find({_id : {$in:mediaIds}});

        for (const media of mediaToDelete){
            await deleteMediaFromCloudinary(media.publicId);
            await Media.findByIdAndDelete(media._id);

            logger.info(`Media deleted ${media._id} with post ${postId}`);


         }
         


        // if(media){
        //     media.posts = media.posts.filter((p) => p.toString() !== postId);
        //     await media.save();
        // }
    }
    catch(e){
        console.log(e);
    }


}

module.exports = {handlePostDeleted};