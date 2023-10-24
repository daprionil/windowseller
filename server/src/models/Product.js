const { DataTypes } = require("sequelize")

module.exports = function(database){
    database.define('Product', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
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
            allowNull: false
        }
    })
}