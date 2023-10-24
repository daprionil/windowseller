const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const { DataTypes } = require("sequelize");

module.exports = function(database){
    
    database.define('User', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            set(){
                this.setDataValue('id', uuidv4());
            }
        },
        namecompany:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[2,40]
            }
        },
        eslogan:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            defaultValue: '',
            validate:{
                len:[0, 300]
            }
        },
        phone:{
            type: DataTypes.INTEGER,
            unique: true,
            validate:{
                isNumeric: true,
            }
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            allowNull:false,
            validate: {
                isEmail: true
            }
        },
        token:{
            type: DataTypes.STRING,
            defaultValue: '',
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            set(value){
                const password = bcrypt.hashSync(value, 4);
                this.setDataValue('password', password);
            }
        },
        enable:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        confirm:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

};
