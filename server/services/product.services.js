const { Product } = require('../db');
const products = require('../data.json');
const { Op } = require('sequelize');

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

        if (size) {
            whereCondition.size = size;
        }

        let order = [];

        if (price === 'asc') {
            order.push(['price', 'ASC']);
        } else if (price === 'desc') {
            order.push(['price', 'DESC']);
        }

        const savedProducts = await Product.findAndCountAll({
            where: whereCondition,
            offset,
            limit,
            order,
        });

        const totalItems = savedProducts.count;
        const totalPages = Math.ceil(totalItems / pageSize);

        if (totalItems === 0) {
            await saveProductsToDatabase();
            return null;
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

const getProductsByName = async (name) => {
    try {
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`,
                },
            },
        });

        return products;
    } catch (error) {
        console.log(error);
        throw error;
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

const deleteProduct = async (id) => {
    try {
        const product = await Product.destroy({ where: { id } });
        return product;
    } catch (error) {
        console.log(error);
    }
};

const createProduct = async (productData) => {
    try {
        const createdProduct = await Product.create(productData);
        return createdProduct;
    } catch (error) {
        // Verificar si el error es de llave duplicada
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new Error('Duplicate product');
        }
        throw error;
    }
};

const updateProduct = async (id, updatedProductData) => {
    try {
        const [updatedRowsCount] = await Product.update(updatedProductData, {
            where: { id },
        });

        if (updatedRowsCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    saveProductsToDatabase,
    getAllProducts,
    getProductsByName,
    getProductsById,
    deleteProduct,
    createProduct,
    updateProduct,
};
