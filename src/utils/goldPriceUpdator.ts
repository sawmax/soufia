const axios = require("axios");
const productTable = require("../model/product");


const goldPriceUpdator = async(Id: number) => {
    try{

        const response = await axios({url : "https://call2.tgju.org/ajax.json?2020092515-20200925112945-start2-jCbd6hCaqCGrDMHeTANm" , method:"get"});
        console.log(response.data.current.geram18);
        const priceGold18perGram: string =  response.data.current.geram18.p.toString().replace(/,/g , '') ;
        if(Id){
            const findedProduct = await productTable.findOne({id : Id});
            
                await findedProduct.update({lastPrice : findedProduct.weight * parseInt(priceGold18perGram) })
            
                return true ;
        }else{
            const allProduct = await productTable.findAll({});
            for(let i of allProduct){
                await i.update({lastPrice : i.weight * parseInt(priceGold18perGram) })
            }
            return true ;
        }
   

    }catch(e){
throw(e)
    }

   

}

export = goldPriceUpdator