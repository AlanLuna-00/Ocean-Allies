const {
    getAllProducts,
    getProductsById,
    deleteProduct,
    createProduct,
    updateProduct,
} = require('../services/product.services');

const getAllProductsController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 4;
        const category = req.query.category || null;
        const price = req.query.price || null;
        const size = req.query.size || null;
        const name = req.query.name || '';
        const sort = req.query.sort || null;
        const color = req.query.color || null;

        const result = await getAllProducts(
            page,
            pageSize,
            category,
            price,
            size,
            name,
            sort,
            color
        );

        if (!result) {
            let message = `No results found`;

            // Verificar si los filtros, excepto name y page, están vacíos
            if (category || price || size || sort || color) {
                message += ` for the specified filters`;
            }

            res.status(204).json({
                message,
            });
            return;
        }

        const { products, totalItems, totalPages, currentPage } = result;

        // Verificar si la página solicitada está fuera de rango
        if (page > totalPages) {
            res.status(204).json({
                message: `Page ${page} does not exist`,
            });
            return;
        }

        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const previousPage = currentPage > 1 ? currentPage - 1 : null;

        res.status(200).json({
            products,
            info: {
                totalItems,
                totalPages,
                currentPage,
                nextPage,
                previousPage,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getProductsById(id);
        response
            ? res.status(200).json(response)
            : res.status(404).json({ message: 'Product not found' });
    } catch (error) {
        res.status(500).json({ message: 'Error getting a product' });
    }
};

const deleteProductController = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await deleteProduct(id);
        response
            ? res.status(200).json({ message: 'Product deleted successfully' })
            : res.status(404).json({ message: 'Product not found' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the product' });
    }
};

const Joi = require('joi');

const allowedSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    category: Joi.string().required(),
    size: Joi.object()
        .pattern(
            /^[a-zA-Z]+$/,
            Joi.object({
                stock: Joi.number().integer().min(0).required(),
            })
        )
        .required()
        .custom((value, helpers) => {
            const sizes = Object.keys(value);
            const invalidSizes = sizes.filter(
                (size) => !allowedSizes.includes(size)
            );
            if (invalidSizes.length > 0) {
                return helpers.error('any.invalid');
            }
            return value;
        }),
    color: Joi.string().required(),
    image: Joi.string().required(),
});

const createProductController = async (req, res) => {
    const productData = req.body;

    // Verificar si se envió un objeto de producto o una matriz de productos
    const products = Array.isArray(productData) ? productData : [productData];

    try {
        const createdProducts = [];
        const invalidProducts = [];

        for (const product of products) {
            // Validar el producto utilizando el esquema definido
            const { error } = productSchema.validate(product);

            if (error) {
                invalidProducts.push({
                    product,
                    error: error.details[0].message,
                });
            } else {
                try {
                    const createdProduct = await createProduct(product);
                    createdProducts.push(createdProduct);
                } catch (error) {
                    if (error.message === 'Duplicate product') {
                        console.log(
                            `Skipping duplicate product: ${product.name}`
                        );
                        invalidProducts.push({
                            product,
                            error: 'Duplicate product',
                        });
                    } else {
                        throw error;
                    }
                }
            }
        }

        if (createdProducts.length > 0) {
            if (invalidProducts.length > 0) {
                res.status(201).json({
                    message: 'Products created successfully',
                    createdProducts,
                    invalidProducts,
                });
            } else {
                res.status(201).json({
                    message: 'Products created successfully',
                    createdProducts,
                });
            }
        } else {
            res.status(400).json({
                message: 'Invalid products',
                invalidProducts,
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating the products' });
    }
};

const updateProductController = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedProduct = await updateProduct(id, updatedData);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating product' });
    }
};

module.exports = {
    getAllProductsController,
    getProductByIdController,
    deleteProductController,
    createProductController,
    updateProductController,
};
