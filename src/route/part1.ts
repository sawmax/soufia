const router = require("express").Router();
const userController = require("../controller/user/main");
const productController = require("../controller/product/main");
const orderController = require("../controller/order/main");
const authWebsite = require("../middleware/websiteAuth");
const multerUserAvatar = require("../middleware/user-multer");
const multerProduct = require("../middleware/product-multer");




//===user routes
router.post("/api/signup" , userController.user_signup) ;
router.post("/api/otp" , userController.otp) ;
router.post("/api/login"  ,  userController.user_login) ;
router.post("/api/forgotPass"  ,  userController.user_forgotPassword) ;
router.post("/api/refreshToken"  ,  userController.user_refreshToken) ;
router.get("/api/userinfo"  , authWebsite , userController.user_getinfo)  ;
router.post("/api/userEdit" , authWebsite , multerUserAvatar.single("pic") ,  userController.user_edit)  ;

//===product routes
router.post("/api/insertProduct" , authWebsite , multerProduct.array("pic" , 5) ,  productController.insert_product)  ;
router.post("/api/editProduct" , authWebsite , multerProduct.array("pic" , 5) ,  productController.edit_product)  ;
router.delete("/api/deleteProduct" , authWebsite  ,  productController.delete_product)  ;
router.post("/api/insertProductComment" , authWebsite ,  productController.insert_product_comment)  ;
router.post("/api/loadProducts" ,  productController.load_products)  ;
router.post("/api/getProductComment"  ,  productController.get_product_comment)  ;
router.post("/api/insertDeleteProductFav" , authWebsite ,  productController.insert_delete_product_fav)  ;
router.post("/api/getUserProductFav" , authWebsite ,  productController.get_user_product_fav)  ;
router.post("/api/generateOffCode" , authWebsite ,  productController.generate_off_code)  ;
router.post("/api/useOffCode" , authWebsite ,  productController.use_off_code)  ;
router.post("/api/getStoneType"  ,  productController.get_stone_type)  ;
router.post("/api/getCategory"  ,  productController.get_category)  ;
router.post("/api/getColors"  ,  productController.get_colors)  ;
router.post("/api/productPriceUpdator"  ,  productController.product_price_updator)  ;







//---order routes
router.post("/api/insertOrder" , authWebsite ,  orderController.insert_order) ;








export = router ;