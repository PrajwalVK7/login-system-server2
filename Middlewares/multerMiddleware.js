const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        const filename = `file-${Date.now()}-${file.originalname}`
        callback(null, filename)
    }
})


const fileFilter = (req, file, callback) => {
    if (file.mimetype == 'application/pdf' || file.mimetype == 'application/doc' || file.mimetype == 'application/docx') {
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