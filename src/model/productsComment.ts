const Sequelize = require("sequelize");

const {sequelize} = require("../database/mysql-connection");

class ProductComment extends Sequelize.Model {}

ProductComment.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
      
        desc: {
            type: Sequelize.STRING,
            allowNull: false 
        }
     
        ,
        productId : {
            type: Sequelize.INTEGER,
            allowNull: false
        } 
        ,
        rate : {
            type: Sequelize.INTEGER,
            allowNull: false
        }
        ,
        mobile : {
            type: Sequelize.STRING,
            allowNull: false
        }
       
    },
    {
        sequelize,
        modelName: "ProductsComment-Table"
    }
);

export = ProductComment;
