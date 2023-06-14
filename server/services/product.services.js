const { Product } = require('../db');
const products = require('../data.json');

const saveProductsToDatabase = async () => {
    try {
        await Product.bulkCreate(products);
    } catch (error) {
        console.log(error);
    }
};

const getAllProducts = async (page, pageSize, category, price, size) => {
    try {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        let whereCondition = {};

        if (category) {
            whereCondition.category = category;
        }

        if (price) {
            whereCondition.price = price;
        }

        if (size) {
            whereCondition.size = size;
        }

        const savedProducts = await Product.findAndCountAll({
            where: whereCondition,
            offset,
            limit,
        });

        const totalItems = savedProducts.count;
        const totalPages = Math.ceil(totalItems / pageSize);

        if (totalItems === 0) {
            await saveProductsToDatabase();
            return {
                products: savedProducts.rows.slice(offset, offset + limit),
                totalItems,
                totalPages,
                currentPage: page,
            };
        }

        return {
            products: savedProducts.rows,
            totalItems,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        console.log(error);
    }
};

const getProductsById = async (id) => {
    try {
        const product = Product.findByPk(id);
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
