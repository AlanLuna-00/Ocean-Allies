const { Product } = require('../db');
const products = require('../data.json');

const saveProductsToDatabase = async () => {
    try {
        await Product.bulkCreate(products);
    } catch (error) {
        console.log(error);
    }
};

const getAllProducts = async () => {
    try {
        const savedProducts = await Product.findAll();

        if (savedProducts.length === 0) {
            await saveProductsToDatabase();
            return products;
        }
        return savedProducts;
    } catch (error) {
        console.log(error);
    }
};

const getProductsById = async (id) => {
    try {
        const product = products.find((item) => item.id === id);
        return product;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    saveProductsToDatabase,
    getAllProducts,
    getProductsById,
};
