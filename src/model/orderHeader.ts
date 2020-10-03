const Sequelize = require("sequelize");

const {sequelize} = require("../database/mysql-connection");

class OrderHeader extends Sequelize.Model {}

OrderHeader.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
      
        terminalId: {
            type: Sequelize.STRING,
            allowNull: false
        }
        ,
        totalPrice: {
            type: Sequelize.STRING,
            allowNull: false
        }
        ,
        discountPrice: {
            type: Sequelize.STRING,
            allowNull: true
        }
        ,
        lastPrice: {
            type: Sequelize.STRING,
            allowNull: false
        }
        ,
        productCount: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
        ,
        address: {
            type: Sequelize.STRING,
            allowNull: false
        }
        ,
        mobile: {
            type: Sequelize.STRING,
            allowNull: false
        }
        ,
        zipCode: {
            type: Sequelize.STRING,
            allowNull: false
        }
        ,
        tel: {
            type: Sequelize.STRING,
            allowNull: false
        }
        ,
        lat: {
            type: Sequelize.DOUBLE,
            allowNull: true
        }    ,
        lan: {
            type: Sequelize.DOUBLE,
            allowNull: true
        }
        ,    
        isInstallmentOrder: {
            type: Sequelize.BOOLEAN,
            default: false
        } ,
        installmentId: {
            type: Sequelize.INTEGER,
            
            allowNull: true
        } 
        ,
        payType: {
            type: Sequelize.INTEGER,
            default: 1
        } 
        ,
        deliveryType: {
            type: Sequelize.INTEGER,
            default: 1
        } 
        ,
        deliveryPrice: {
            type: Sequelize.STRING,
            allowNull: true
        }
        , 
        offCode: {
            type: Sequelize.STRING,
            allowNull: true
        } ,
        status : {
            type: Sequelize.INTEGER,
            default: 0
        }
  
    },
    {
        sequelize,
        modelName: "OrderHeader-Table"
    }
);

export = OrderHeader;
