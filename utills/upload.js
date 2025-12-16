import cloudinary from '../config/cloudinary.js';

const uploadToCloudinay = async (fileBuffer) => {
    return new Promise ((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'blog_images',

            },
            (error, result) => {
                if(error) return reject(error)
                    resolve(result)
            }
        ).end(fileBuffer)
    })
}

export default uploadToCloudinay