const orderHeaderTable = require("../../model/orderHeader");
const orderDetailTable = require("../../model/orderDetail");
const productTable = require("../../model/product");
const userTable = require("../../model/user");
const { checkParam } = require("../../utils/parameterChecker");
const { CustomErr } = require("../../utils/errorCreatorClass");





const insert_order = async (req, res, next) => {
  const {Address , ZipCode , OffCode , Tel , Mobile , PayType , DeliveryType , DeliveryPrice , Lat , Lan , TotalPrice , TotalCount , DiscountPrice , LastPrice ,  TerminalId , IsInstallmentOrder , InstallmentId , ProductInfoArray} = req.body;
  const {isAdmin , mobile} = req.payload ;
  try {
    if (!isAdmin) {
      const Err = new CustomErr("role access denied !", 400);
      Err.throwingErr();
    }
    const result = checkParam([Address , ZipCode , Tel  , PayType, DeliveryType, TotalCount , Mobile ,  Lat , Lan , TotalPrice , DiscountPrice , LastPrice ,  TerminalId ]);
    if (!result || !Array.isArray(ProductInfoArray)) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }

    


   const newModel =  await orderHeaderTable.create({offCode : OffCode ,  payType : PayType , deliveryPrice : DeliveryPrice ,  deliveryType : DeliveryType ,address : Address ,zipCode : ZipCode , tel : Tel ,mobile : Mobile ,lat : Lat ,lan : Lan ,totalPrice : TotalPrice ,discountPrice : DiscountPrice , lastPrice : LastPrice , terminalId : TerminalId ,
   isInstallmentOrder : IsInstallmentOrder ,count : TotalCount , installmentId : InstallmentId})
   
for(let i of ProductInfoArray){
  await orderDetailTable.create({orderId : newModel.dataValues.id , count : i.Count , totalPrice : i.TotalPrice ,discountPrice : i.DiscountPrice , lastPrice : i.LastPrice , productId : i.ProductId })
}
    res.status(200).json({ message: "done !", response: newModel });
  } catch (e) {
    next(e);
  }
};




//=========================

export = {insert_order}