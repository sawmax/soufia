const Sequelize = require('sequelize') ; 
const sequelize = new Sequelize("goldStore_db" , "root" , process.env.mysqlPass  ,{
    dialect : "mysql" ,
    host : "localhost"
}) ;

const connect = async() => {
    return sequelize.sync().then(data=>{ console.log("db connected !") }).catch(e => { console.log(`db connection failed because ${e.message}`) })

}
export = {connect , sequelize}