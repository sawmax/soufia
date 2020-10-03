const Sequelize = require("sequelize");

const {sequelize} = require("../database/mysql-connection");

class OrderDetail extends Sequelize.Model {}

OrderDetail.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
      
        orderId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
        ,
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
        ,
        count: {
            type: Sequelize.STRING,
            allowNull: false
        }
        ,
        totalPrice: {
            type: Sequelize.STRING,
            allowNull: false
        }    ,
        discountPrice: {
            type: Sequelize.STRING,
            allowNull: true
        }    ,
        lastPrice: {
            type: Sequelize.STRING,
            allowNull: false
        }
  
    },
    {
        sequelize,
        modelName: "OrderDetail-Table"
    }
);

export = OrderDetail;
