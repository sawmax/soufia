const jwt = require("jsonwebtoken");
const {CustomErr} = require("../utils/errorCreatorClass");
const {checkParam} = require("../utils/parameterChecker");
const tokenTable = require("../model/token");

const authWebsite = async(req , res , next) => {

    try{

const {authorization} = req.headers ; 
const checkHeader = checkParam([authorization]) ;
if(!checkHeader) {
    const Err = new CustomErr("unauthorized !" , 401);
    Err.throwingErr();
};
const token = authorization.split(" ")[1] ;
if(!token) {
    const Err = new CustomErr("unauthorized !" , 401);
    Err.throwingErr();
};


const checkToken = await jwt.verify(token , process.env.secretKey) ;
if(!checkToken){
    const Err = new CustomErr("unauthorized !" , 401);
    Err.throwingErr();
}

req.payload = checkToken ;
next()

    }catch(e){
        if(e.message.includes("jwt")){
            e.status = 401 ;
        }else{
            e.status ? e.status = parseInt(e.status) : e.status = 500
        }
      
       next(e)
    }


}

export = authWebsite