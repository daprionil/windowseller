const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const { DataTypes } = require("sequelize");
const CustomErrors = require('../utils/errors/CustomErrors');

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
            allowNull: false,
            validate:{
                len:[5, 150],
            },
        },
        description:{
            type: DataTypes.TEXT,
            defaultValue: '',
            validate:{
                len:[0, 300]
            }
        },
        phone:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate:{
                isNumeric: (value) => {
                    if(isNaN(Number(value))){
                        throw CustomErrors.SintaxError('El teléfono no es válido')
                    }
                }
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
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            set(value){
                //!############# ENCRYPT PASSWORD CHANGES ############
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
