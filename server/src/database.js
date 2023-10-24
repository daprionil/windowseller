const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

//* Properties DATABASE CONNECTION
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env;

//* CONNECTION DATABASE
const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,{
    logging: false
});

//! Read the models
const pathmodels = path.join(__dirname, 'models');
const filesModels = fs.readdirSync(pathmodels);

for(let i = 0; i < filesModels.length; i++){
    const pathmodel = path.join(pathmodels, filesModels[i]);
    const model = require(pathmodel);
    //! Generate model
    model(db);
}

//!Relations
const { User, Category, Catalog, Theme, Product } = db.models;

//? --------- User has many products. Product belongs to one User
User.hasMany(Product, {as: 'products'});
Product.belongsTo(User);

//? --------- User has many catalogs. Catalgos belongs to one User
User.hasMany(Catalog, {as: 'Catalogs'});
Catalog.belongsTo(User);

//? --------- Catalog has one theme
Theme.hasMany(Catalog, {as: 'themeCatalog'});
Catalog.belongsTo(Theme);

//? --------- Catalog has many categories and Category has many Catalogs
Catalog.belongsToMany(Category, { through: 'CatalogCategories', timestamps: false});
Category.belongsToMany(Catalog, { through: 'CatalogCategories', timestamps: false});

//? --------- Product has many Categories and Categories Has Many Products
Product.belongsToMany(Category, {through: 'ProductCategories', timestamps: false});
Category.belongsToMany(Product, {through: 'ProductCategories', timestamps: false});

//? --------- Catalog has many products and Products has many Catalogs
Product.belongsToMany(Catalog, { through: 'CatalogProducts', timestamps: false});
Catalog.belongsToMany(Product, { through: 'CatalogProducts', timestamps: false});

//? --------- User has many Categories and Category belongs to User
User.hasMany(Category);
Category.belongsTo(User);

module.exports = {
    db,
    ...db.models
};