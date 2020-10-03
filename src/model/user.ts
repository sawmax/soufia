const Sequelize = require("sequelize");

const {sequelize} = require("../database/mysql-connection");

class User extends Sequelize.Model {}

User.init(
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
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
        ,
        mobile: {
            type: Sequelize.STRING,
            allowNull: false ,
            unique: true
        }
        ,
        nid: {
            type: Sequelize.STRING,
            allowNull: true
        } ,
        zipcode: {
            type: Sequelize.STRING,
            allowNull: true
        } 
        ,
        email: {
            type: Sequelize.STRING,
            allowNull: true
        } 
        ,
        tel: {
            type: Sequelize.STRING,
            allowNull: true
        } 
        ,
        cardNumber: {
            type: Sequelize.STRING,
            allowNull: true
        }
        ,
        address: {
            type: Sequelize.STRING,
            allowNull: true
        }
        ,
        avatar: {
            type: Sequelize.STRING,
            allowNull: true
        }
        ,
        
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: "Users-Table"
    }
);

export = User;
