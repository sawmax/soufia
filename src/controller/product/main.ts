const productTable = require("../../model/product");
const commentTable = require("../../model/productsComment");
const categoryTable = require("../../model/category");
const subCategoryTable = require("../../model/subCategory");
const offCodeTable = require("../../model/offCode");
const colorTable = require("../../model/colors");
const stoneTypeTable = require("../../model/stoneType");
const userFavTable = require("../../model/userFav");
const { checkParam } = require("../../utils/parameterChecker");
const { CustomErr } = require("../../utils/errorCreatorClass");
const priceUpdator = require("../../utils/goldPriceUpdator");
const randomize = require('randomatic');
const Op = require('sequelize').Op;



const insert_product = async (req, res, next) => {
  const { Name , MinPrice , MaxPrice , LastPrice  , StoneType , DiscountPrice , IsGift , Changable , Cashback , Category , SubCategory , Desc , Size , Weight , WeightUnit , Inv ,HasStone ,StoneColors } = req.body;
  const {isAdmin , mobile} = req.payload ;
  try {
    if (!isAdmin) {
      const Err = new CustomErr("role access denied !", 400);
      Err.throwingErr();
    }
    const result = checkParam([Name , LastPrice , Category , SubCategory , IsGift , Changable , Cashback , Size , Weight , StoneColors ,  WeightUnit , Inv ]);
    if (!result) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }
    let picArray: Array<string> = [] ;
console.log(picArray)
  for(let i of req.files) picArray.push(`${process.env.myip}/${i.filename}`)
console.log(Name )

   const newModel =  await productTable.create({stoneType : StoneType ,name : Name , creatorMobile : mobile , lastPrice : LastPrice , minPrice : MinPrice , maxPrice: MaxPrice , isGift : IsGift , cashback : Cashback ,
      changable : Changable ,  discountPrice : DiscountPrice , inventory : Inv , desc : Desc , size : Size , weight : Weight , weightUnit:WeightUnit , category : Category , subCategory : SubCategory ,
    productImages : JSON.stringify(picArray)  ,hasStone : HasStone, stoneColors : JSON.stringify(StoneColors) })

await priceUpdator()
    res.status(200).json({ message: "done !", response: newModel });
  } catch (e) {
    next(e);
  }
};




//=========================


const edit_product = async (req, res, next) => {
  const {ProductId , StoneType, StoneColors , HasStone,  Name , MinPrice , MaxPrice , Status , LastPrice , DiscountPrice , IsGift , Changable , Cashback , Category , SubCategory , Desc , Size , Weight , WeightUnit , Inv } = req.body;
  const {isAdmin , mobile} = req.payload ;
  try {
    if (!isAdmin) {
      const Err = new CustomErr("role access denied !", 400);
      Err.throwingErr();
    }
    const result = checkParam([ProductId , Name , Status ,  LastPrice , Category , SubCategory , IsGift , Changable , Cashback , Size , Weight ,  WeightUnit , Inv ]);
    if (!result) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }


   await productTable.update({
    productImages : "" } , {where : {id : ProductId }})

let picArray: Array<String> = [] ;
console.log(picArray)
  for(let i of req.files) picArray.push(`${process.env.myip}/${i.filename}`)


   const updateModel =  await productTable.update({stoneType : StoneType , hasStone : HasStone , stoneColors : JSON.stringify(StoneColors) , name : Name , creatorMobile : mobile , lastPrice : LastPrice , minPrice : MinPrice , maxPrice: MaxPrice , isGift : IsGift , cashback : Cashback ,
      changable : Changable ,status : Status ,  discountPrice : DiscountPrice , inventory : Inv , desc : Desc , size : Size , weight : Weight , weightUnit:WeightUnit , category : Category , subCategory : SubCategory ,
    productImages : JSON.stringify(picArray) } , {where : {id : ProductId }})

    await priceUpdator()

    res.status(200).json({ message: "done !", response: updateModel });
  } catch (e) {
    next(e);
  }
};



const delete_product = async (req, res, next) => {
  const {ProductId } = req.body;
  const {isAdmin , mobile} = req.payload ;
  try {
    if (!isAdmin) {
      const Err = new CustomErr("role access denied !", 400);
      Err.throwingErr();
    }
    const result = checkParam([ProductId  ]);
    if (!result) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }
  


   await productTable.destroy({where : {id :ProductId }})


    res.status(200).json({ message: "done !", response:{} });
  } catch (e) {
    next(e);
  }
};


const insert_product_comment = async (req, res, next) => {
  const {ProductId , Desc , Rate  } = req.body;
  const {isAdmin , mobile} = req.payload ;
  try {
  
    const result = checkParam([ProductId , Desc , Rate]);
    if (!result) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }
  


   const newComment = await commentTable.create({desc : Desc , rate : Rate , mobile : mobile , productId :ProductId })


    res.status(200).json({ message: "done !", response:newComment });
  } catch (e) {
    next(e);
  }
};


const get_product_comment = async (req, res, next) => {
  const {ProductId } = req.body;
  
  try {
  
    const result = checkParam([ProductId]);
    if (!result) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }
  


   const findedComment = await commentTable.findAll({where : {productId :ProductId}}) ;


    res.status(200).json({ message: "done !", response:findedComment });
  } catch (e) {
    next(e);
  }
};

//===================
const get_stone_type = async (req, res, next) => {
 
  
  try {

  


   const response = await stoneTypeTable.findAll({}) ;


    res.status(200).json({ message: "done !", response });
  } catch (e) {
    next(e);
  }
};
//===================
const get_colors = async (req, res, next) => {
 
  
  try {

  


   const response = await colorTable.findAll({}) ;


    res.status(200).json({ message: "done !", response });
  } catch (e) {
    next(e);
  }
};
//===================
const product_price_updator = async (req, res, next) => {
 
  const {Id} = req.body
  
  try {

    const result = checkParam([Id]);
    if (!result) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }


   const response = await priceUpdator(Id) ;


    res.status(200).json({ message: "done !", response });
  } catch (e) {
    next(e);
  }
};
//=====================

const get_category = async (req, res, next) => {
 
  const {Type , Parent} = req.body ;
 

  try {

  let response ;
switch (Type) {
  case 1:
    response = await categoryTable.findAll({}) ;
    break;
    case 2:
      response = await subCategoryTable.findAll({categoryId : Parent}) ;
      break;
  default:
    break;
}

   


    res.status(200).json({ message: "done !", response });
  } catch (e) {
    next(e);
  }
};
//=====================

const insert_delete_product_fav = async (req, res, next) => {
  const {ProductId  } = req.body;
  const {isAdmin , mobile} = req.payload ;
  try {
  
    const result = checkParam([ProductId ]);
    if (!result) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }
  


   const findedProduct = await userFavTable.findOne({where : {productId :ProductId , mobile }}) ;
if(!findedProduct){
  await userFavTable.create({productId :ProductId , mobile }) ;
}else{
  await findedProduct.destroy()
}

    res.status(200).json({ message: "done !", response:{} });
  } catch (e) {
    next(e);
  }
};


//========================

const load_products = async (req, res, next) => {
  const {Type , Name , HasStone , StoneType ,ProductId, Category , SubCategory} = req.body;
  // const {isAdmin , mobile} = req.payload ;
  try {
  
    const result = checkParam([Type ]);
    if (!result) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }

    let response ;
  switch (Type) {
    case 1:
      response = await productTable.findAll({});
      break;
      case 2:
        response = await productTable.findAll({where : {name : {[Op.like]: `%${Name}%`}}});
        break;
        case 3:
          response = await productTable.findAll({where : {category : Category }});
          break;
          case 4:
            response = await productTable.findAll({where : {subCategory : SubCategory }});
            break;
            case 5:
              response = await productTable.findAll({order:'discountPrice' , limit : 10}  );
              break;
              case 6:
                response = await productTable.findOne({where : {id : ProductId}});
                break;
                case 7:
                  response = await productTable.findAll({where : {hasStone : HasStone}});
                  case 8:
                    response = await productTable.findAll({where : {stoneType : StoneType}});
                  
                  break;
    default:
      break;
  }



    res.status(200).json({ message: "done !", response });
  } catch (e) {
    next(e);
  }
};

//========================

const get_user_product_fav = async (req, res, next) => {
  const {ProductId  } = req.body;
  const {isAdmin , mobile} = req.payload ;
  try {
  
    // const result = checkParam([ProductId ]);
    // if (!result) {
    //   const Err = new CustomErr("required field does not send !", 422);
    //   Err.throwingErr();
    // }
  


   let response ; 
if(!ProductId){
  response =  await userFavTable.findAll({where : { mobile }}) ;
}else{
  response =  await userFavTable.findOne({where : { mobile , productId : ProductId }}) ;
}

    res.status(200).json({ message: "done !", response:response });
  } catch (e) {
    next(e);
  }
};




const generate_off_code = async (req, res, next) => {
  const {Amount} = req.body;
  const {isAdmin , mobile} = req.payload ;
  try {
    if (!isAdmin) {
      const Err = new CustomErr("role access denied !", 400);
      Err.throwingErr();
    }
    const result = checkParam([Amount ]);
    if (!result) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }
  

    const Code = randomize('Aa0', 12);

  const NewModel =  await offCodeTable.create({codeName : Code , amount : Amount}) ;


    res.status(200).json({ message: "done !", response:NewModel });
  } catch (e) {
    next(e);
  }
};

const use_off_code = async (req, res, next) => {
  const {OffCode} = req.body;
  const {isAdmin , mobile} = req.payload ;
  try {
  
    const result = checkParam([OffCode ]);
    if (!result) {
      const Err = new CustomErr("required field does not send !", 422);
      Err.throwingErr();
    }
  

    

  const findedModel =  await offCodeTable.findeOne({where:{codeName : OffCode , used : false }}) ;
if(!findedModel){
  const Err = new CustomErr("this code not found or used before !", 400);
  Err.throwingErr();
}
await findedModel.update({used : true});
    res.status(200).json({ message: "done !", response:findedModel });
  } catch (e) {
    next(e);
  }
};


export = {insert_product , edit_product , delete_product , insert_product_comment ,
   get_product_comment , insert_delete_product_fav , get_colors , get_category ,product_price_updator , get_stone_type , get_user_product_fav , load_products, use_off_code , generate_off_code}