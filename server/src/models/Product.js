const { DataTypes } = require("sequelize")

module.exports = function(database){
    database.define('Product', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: '',
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            get(value){
                return `$ ${Number(value)}.00`
            }
        },
        image:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        avaliable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        /*//! Administrator contact */
        enabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    })
}