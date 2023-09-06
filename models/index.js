const Auth = require('./Auth');
const Admin=require('./Admin');
const Users = require('./Users');
const BlockedToken = require('./BlockedToken');
const Sellers = require('./Sellers');
const Addresses = require('./Addresses');
//const CartItems = require('./CartItems');
const Categories = require('./Categories');
const OrderItems = require('./OrderItems');
const Orders = require('./Orders');
const Products = require('./Products');
const SubCategories=require('./SubCategories');
const ProductSpecifications = require('./ProductSpecifications');

// Association: Auth and Users one to one
Auth.hasOne(Users, {foreignKey: 'auth_id'});
Users.belongsTo(Auth, {foreignKey: 'auth_id'});


//Association: Sellers and Products one to many
Sellers.hasMany(Products, { foreignKey: 'seller_id', onDelete: 'CASCADE'});
Products.belongsTo(Sellers, { foreignKey: 'seller_id', onDelete: 'CASCADE' });


//Association: Users and Addresses one to many
Auth.hasMany(Addresses, { foreignKey: 'auth_id' });
Addresses.belongsTo(Users, { foreignKey: 'auth_id' });


//Association: Orders and OrderItems one to many
Orders.hasMany(OrderItems, { foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderItems.belongsTo(Orders, { foreignKey: 'order_id', onDelete: 'CASCADE' });


//Association: Products and OrderItems one to many
Products.hasMany(OrderItems, { foreignKey: 'product_id' });
OrderItems.belongsTo(Products, { foreignKey: 'product_id' });


//Association: Users and Orders one to many
Auth.hasMany(Orders, { foreignKey: 'auth_id' });
Orders.belongsTo(Users, { foreignKey: 'auth_id' });


//Association: Addresses and Orders one to many
Addresses.hasMany(Orders, { foreignKey: 'address_id' });
Orders.belongsTo(Addresses, { foreignKey: 'address_id' });

//Association: SubCategories and Products one to many
SubCategories.hasMany(Products, { foreignKey: 'subcategory_id' });
Products.belongsTo(SubCategories, { foreignKey: 'subcategory_id' });

//Association: Categories and SubCategories one to many
Categories.hasMany(SubCategories, { foreignKey: 'category_id' });
SubCategories.belongsTo(Categories, { foreignKey: 'category_id' });

//Association: Products and ProductSpecifications one to many
Products.hasMany(ProductSpecifications, { foreignKey: 'product_id' });
ProductSpecifications.belongsTo(Products, { foreignKey: 'product_id' });

module.exports = { Auth,Admin, BlockedToken, Sellers, Addresses, Categories, SubCategories,OrderItems, Orders, Products,ProductSpecifications,Users };