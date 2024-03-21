const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, "./v1/public/images")
    },
    filename: (req, file, cb) =>
    {
        //console.log(req.file)
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer(
    {
        storage: storage,
    }
)


module.exports = upload;