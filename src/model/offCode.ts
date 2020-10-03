const Sequelize = require("sequelize");

const {sequelize} = require("../database/mysql-connection");

class OffCodes extends Sequelize.Model {}

OffCodes.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
      
        codeName: {
            type: Sequelize.STRING,
            allowNull: false
        }
        ,
        amount: {
            type: Sequelize.BIGINT,
            allowNull: false
        }
        ,
      
        used: {
            type: Sequelize.BOOLEAN,
            default: false
        }
       
       
    },
    {
        sequelize,
        modelName: "OffCode-Table"
    }
);

export = OffCodes;
