const userTable = require("../../model/user");
const tokenTable = require("../../model/token");
const commentTable = require("../../model/productsComment");
const { checkParam } = require("../../utils/parameterChecker");
const { CustomErr } = require("../../utils/errorCreatorClass");
const kavenegarSms = require("../../sms/kavenegar");
const redis = require("../../database/redis-connection");
const jwt = require("jsonwebtoken");
//const {v4} = require("uuid")
const bcrypt = require("bcrypt");



const otp = async (req, res, next) => {
  const { Mobile, Type } = req.body;
  try {
    const result = checkParam([Mobile]);
    if (!result) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }
    const code = Math.floor(Math.random() * 90001);
    if (Type === 1) {
      await kavenegarSms(`${code} : کد فعالسازی `, Mobile);
      await redis.setAsync(Mobile, code);
      await redis.expireAsync(Mobile, 120);
    }
    if (Type === 2) {
      const findUser = await userTable.findOne({ where: { mobile: Mobile } });
      if (!findUser) {
        const Err = new CustomErr("mobile not found !", 422);
        Err.throwingErr();
      }
      await kavenegarSms(`${code} : کد فعالسازی `, Mobile);
      await redis.setAsync(Mobile, code);
      await redis.expireAsync(Mobile, 120);
    }

    res.status(200).json({ message: "done !", response: {} });
  } catch (e) {
    next(e);
  }
};

//======================================

const user_signup = async (req, res, next) => {
  const { Mobile, Name, Password, Otp } = req.body;
  try {
    const result = checkParam([Mobile, Name, Password, Otp]);
    if (!result) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }
    const otpCheck = await redis.getAsync(Mobile);
    if (!otpCheck) {
      const Err = new CustomErr("invalid otp !", 400);
      Err.throwingErr();
    }
    const hashedPass = await bcrypt.hash(Password, 12);

    const newUser = await userTable.create({
      name: Name,
      password: hashedPass,
      mobile: Mobile,
    });
    res.status(200).json({ message: "done !", response: newUser });
  } catch (e) {
    if (e.message === "Validation error") e.message = "this mobile already exist !";
      
    next(e);
  }
};
//======================================

const user_edit = async (req, res, next) => {
    const {Name , ZipCode , Nid , Email , Tel  } = req.body;
    try {
        const {mobile} = req.payload ;
   
      const updateUser = await userTable.update({
        name: Name,
        zipcode: ZipCode,
        nid: Nid,
        email : Email ,
        tel : Tel ,
        avatar : req.file.filename ? `${process.env.myip}/${req.file.filename}`  :  ""
      } , {where : {mobile}});
      res.status(200).json({ message: "done !", response: updateUser });
    } catch (e) {
      next(e);
    }
  };
//======================================

const user_login = async (req, res, next) => {
  const { Mobile, Password } = req.body;
  try {
    const result = checkParam([Mobile, Password]);
    if (!result) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }
    const findUser = await userTable.findOne({ where: { mobile : Mobile } });
    if (!findUser) {
      const Err = new CustomErr("invalid username !", 400);
      Err.throwingErr();
    }


console.log(findUser.dataValues.password) 
    const comparePass = await bcrypt.compare(Password , findUser.dataValues.password);
    if (!comparePass) {
      const Err = new CustomErr("invalid password !", 400);
      Err.throwingErr();
    }

    const accessToken = await jwt.sign(
      { mobile: Mobile , isAdmin :findUser.dataValues.isAdmin  },
      process.env.secretKey,
      { expiresIn: "15d" }
    );
    const refreshToken = await jwt.sign(
      { mobile: Mobile , isAdmin :findUser.dataValues.isAdmin },
      process.env.secretKey,
      { expiresIn: "15m" }
    );
    const checkdupToken = await tokenTable.findOne({where : {mobile : Mobile }}) ;
    if(!checkdupToken){
      await tokenTable.create({ mobile: Mobile, accessToken });
    }else{
      await checkdupToken.update({accessToken });
    }
   

    res.status(200).json({
      message: "done !",
      response: {
        refreshToken,
        userdata: { mobile: Mobile, name: findUser.name , isAdmin : findUser.dataValues.isAdmin }
      }
    });
  } catch (e) {
    next(e);
  }
};

//======================================

const user_forgotPassword = async (req, res, next) => {
  const { Otp, Password, Mobile } = req.body;
  try {
    const result = checkParam([Otp, Password, Mobile]);
    if (!result) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }
    const otpCheck = await redis.getAsync(Mobile);
    if (!otpCheck) {
      const Err = new CustomErr("invalid otp !", 400);
      Err.throwingErr();
    }
    const findUser = await userTable.findOne({ where: { Mobile } });
    if (!findUser) {
      const Err = new CustomErr("invalid username !", 400);
      Err.throwingErr();
    }

    const newPass = await bcrypt.hash(Password, 12);
    await findUser.update({ password: newPass });

    res.status(200).json({ message: "done !", response: {} });
  } catch (e) {
    next(e);
  }
};

//======================================

const user_refreshToken = async (req, res, next) => {
  const { Token } = req.body;
  try {
    const result = checkParam([Token]);
    if (!result) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }
    const checkToken = await jwt.verify(Token, process.env.secretKey, {
      ignoreExpiration: true,
    });
    const findToken = await userTable.findOne({
      where: { Mobile: checkToken.mobile },
    });
    if (!findToken) {
      const Err = new CustomErr("invalid token !", 400);
      Err.throwingErr();
    }
  await jwt.verify(
      findToken.dataValues.accessToken,
      process.env.secretKey
    );

    const newToken = await jwt.sign(
      { mobile: checkToken.mobile ,  isAdmin :checkToken.isAdmin },
      process.env.secretKey,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      message: "done !",
      response: newToken
    });
  } catch (e) {
    next(e);
  }
};


//======================================

const user_getinfo = async (req, res, next) => {
  const { mobile } = req.payload;
  try {


    const findUser = await userTable.findOne({
      where: { Mobile: mobile },
    });

    const findComment = await commentTable.find({
      where: { Mobile: mobile },
    });

    if (!findUser) {
      const Err = new CustomErr("record not found !", 400);
      Err.throwingErr();
    }


    res.status(200).json({
      message: "done !",
      response: {userInfo : findUser , userComments :findComment }
    });
  } catch (e) {
    next(e);
  }
};

export = { user_signup, user_login, otp, user_forgotPassword , user_refreshToken , user_edit , user_getinfo };
