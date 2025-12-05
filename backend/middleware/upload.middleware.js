// middleware/upload.middleware.js

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null , ' uploads/');
    },
    filename: function (req , file , cb){
        const unique = Date.now() + '-' + Math.round(Math.random()*1E9);
        cb(null , unique+ path.extname(file.originalname));
    }
});

const fileFilter = ( req , file , cb)=>{
    //Accept images only 
    if(!file.mimetype.startsWith('image/')){
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null , true);
};

module.exports = multer({storage , fileFilter});


