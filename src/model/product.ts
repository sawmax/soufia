const Sequelize = require("sequelize");

const {sequelize} = require("../database/mysql-connection");

class Product extends Sequelize.Model {}

Product.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
      
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
     
        ,
        category : {
            type: Sequelize.STRING,
            allowNull: false

        }
        ,
        hasStone : {
            type: Sequelize.BOOLEAN,
            default: false

        }
        ,
        stoneColors : {
            type: Sequelize.TEXT,
            allowNull: true

        }
        ,
        stoneType : {
            type: Sequelize.INTEGER,
            allowNull: true

        }
        ,
        subCategory : {
            type: Sequelize.STRING,
            allowNull: false

        }
        ,
        weight: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
        ,
        weightUnit: {
            type: Sequelize.STRING,
            allowNull: false
        } ,
        size: {
            type: Sequelize.INTEGER,
             allowNull: true
        }
        ,
        lastPrice: {
            type: Sequelize.BIGINT,
            allowNull: true 
        }
        ,
        minPrice: {
            type: Sequelize.BIGINT,
            allowNull: true
        } ,
        maxPrice: {
            type: Sequelize.BIGINT,
            allowNull: true
        } 
        ,
        discountPrice: {
            type: Sequelize.BIGINT,
            allowNull: true
        } 
        ,
        inventory: {
            type: Sequelize.INTEGER,
            allowNull: false
        } 
        ,
        isGift: {
            type: Sequelize.BOOLEAN,
            default : false
        } ,
        changable : {
            type: Sequelize.BOOLEAN,
            default : false
        } ,
        cashback : {
            type: Sequelize.BOOLEAN,
            default : false
        } ,
        desc : {
            type: Sequelize.STRING,
            allowNull: true
        } ,
        productImages : {
            type: Sequelize.TEXT,
            allowNull: true 
        } , 
        status : {
            type: Sequelize.BOOLEAN,
            default : true
        } ,
        creatorMobile : {
            type: Sequelize.STRING,
            allowNull: false 
        } , 
 
    },
    {
        sequelize,
        modelName: "Products-Table"
    }
);

export = Product;
