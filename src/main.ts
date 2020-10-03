require('dotenv').config({ path: './config/product.env' })
const server = require("./express-config/main");
const {connect} = require("./database/mysql-connection");
const redis = require("./database/redis-connection");
const goldPriceUpdator = require("./utils/goldPriceUpdator");








server.listen(process.env.port , async()=>{
    try{
        // redis().redis.on('connect', async( ) => {
        //     console.log('redis connected');
        //     // await connect()
        //     // console.log(`server running on ${process.env.port}`)
        // });
        setInterval( async() => {
            //  I will run for every 15 minutes
            try{
                await goldPriceUpdator() ;
                console.log("gold price updated")
            }catch(e){
                console.log("gold price got error")
                process.exit(1)
            }
          
           },  5 * 60 * 1000); // every 5 min
    //    const price = 
    //    console.log(price)
        await connect()
        console.log(`server running on ${process.env.port}`)

        
     
    }catch(e){
console.log(e.message)
    }
  
})