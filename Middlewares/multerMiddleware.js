const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log("Req body",req.body); 
    console.log(req.files); 

        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        const filename = `file-${Date.now()}-${file.originalname}`
        callback(null, filename)
    }
})


const fileFilter = (req, file, callback) => {
    if (file.mimetype == 'file/pdf' || file.mimetype == 'image/doc' || file.mimetype == 'image/docx') {
           callback(null, true)

    }
    else {
        callback(null, false)
        return callback(new Error('Only pdf,doc,docx files are allowed'))
    }
}

const multConfigure = multer({
    storage,
    fileFilter
})
module.exports = multConfigure;