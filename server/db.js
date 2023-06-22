require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    {
        logging: false,
        native: false,
    }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
    .filter(
        (file) =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
    )
    .forEach((file) => {
        const modelDefiner = require(path.join(__dirname, '/models', file));
        modelDefiners.push(modelDefiner(sequelize));
    });

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Relaciones

const { Product, User, Testimony, Review, Purchase } = sequelize.models;

// Relación User - Review
User.hasMany(Review);
Review.belongsTo(User);

// Relación Product - Review
Product.hasMany(Review);
Review.belongsTo(Product);

// Relación User - Testimony
User.hasOne(Testimony);
Testimony.belongsTo(User);

// Relación User - Purchase
User.hasMany(Purchase);
Purchase.belongsTo(User);

// Relación Product - Purchase
Product.hasMany(Purchase);
Purchase.belongsTo(Product);

module.exports = {
    ...sequelize.models,
    conn: sequelize,
};
