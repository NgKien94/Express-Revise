const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const systemConfig = require('../../configs/system')

// Config cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

//End config cloudinary

module.exports.uploadCloud = async (req, res, next) => {
    // trường hợp có file được upload 
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    {timeout: 10000},
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            try{
                let result = await streamUpload(req);
                req.body[req.file.fieldname] = result.secure_url;
                next();
                return;
            }catch(error){
                console.log("Error upload file to Cloudinary: ",error)
                req.flash('error',"Có lỗi xảy ra khi upload ảnh, vui lòng thử lại sau");
                res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
                return;
            }
           
        }
        await  upload(req);
        
    }
    else {
        // trường hợp không có file upload
        next();
    }
}