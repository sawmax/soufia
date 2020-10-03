const multer = require("multer") ;
const uuid = require("uuid");
const path = require("path");


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null , path.join(__dirname , "../public/images/products" ))

    },
    filename:(req,file,cb)=>{
        cb(null ,`product_${uuid.v4()} _ ${file.originalname}`);
    }

}) ;

const filefilter = (req,file,cb)=>{
    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg"){
        cb(null , true);
    }
    else{
       req.validateFile = "Not suppoorted image format" ; 
        cb(null , false);
    }
}
const upload = multer({dest:"../public/images/products/"  , storage , fileFilter : filefilter});

export = upload ;