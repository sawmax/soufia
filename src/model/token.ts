const Sequelize = require("sequelize");

const {sequelize} = require("../database/mysql-connection");

class Token extends Sequelize.Model {}

Token.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
      
        mobile: {
            type: Sequelize.STRING,
            allowNull: false ,
            unique: true
        }
      
        ,
        accessToken: {
            type: Sequelize.STRING,
            allowNull: false
        }
     
      
     
    },
    {
        sequelize,
        modelName: "Tokens-Table"
    }
);

export = Token;
