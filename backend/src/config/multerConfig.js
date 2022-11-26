const multer = require('multer')

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, callback)=>{
            callback(null, './uploads')
        },
        filename: (req, file, callback)=>{
            callback(null, Date.now().toString() + '_' + file.originalname)
        },
    }),
    fileFilter: (req, file, callback)=>{
        const extension = ['image/png', 'image/jpg', 'image/jpeg', 'video/mp4'].find(format => format === file.mimetype);

        if(extension) return callback(null, true)

        return callback(null, false)
    },
    limits: {
        fileSize: 52428800,
    }
}))