const Sequelize = require("sequelize");

const {sequelize} = require("../database/mysql-connection");

class StoneType extends Sequelize.Model {}

StoneType.init(
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
     
    
       
    },
    {
        sequelize,
        modelName: "StoneType-Table"
    }
);

export = StoneType;
