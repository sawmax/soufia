const Kavenegar = require("kavenegar");
const api = Kavenegar.KavenegarApi({apikey: '4F42722B434F353132364D4C493473664463675073516D507A7674585054553642685131674D494C6951773D'});
const {CustomErr} = require("../utils/errorCreatorClass");

const sendOtp = async (message: string , receptor: string ) => {
try{
    await api.Send({ message , sender: "1000596446" , receptor });
}catch(e){
const Err = new CustomErr(e.message , e.status ? parseInt(e.status) : 500) ;
Err.throwingErr()
}
   
}

export = sendOtp