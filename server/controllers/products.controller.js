const {
    getAllProducts,
    getProductsByName,
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

        const result = await getAllProducts(
            page,
            pageSize,
            category,
            price,
            size
        );

        if (!result) {
            res.status(404).json({ message: 'No products found' });
            return;
        }

        const { products, totalItems, totalPages, currentPage } = result;
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const previousPage = currentPage > 1 ? currentPage - 1 : null;

        res.status(200).json({
            products,
            totalItems,
            totalPages,
            currentPage,
            nextPage,
            previousPage,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error getting products' });
    }
};

const getProductsNameController = async (req, res) => {
    try {
        const name = req.query.query || '';

        const products = await getProductsByName(name);

        if (products.length === 0) {
            res.status(404).json({ message: 'No products found' });
            return;
        }

        res.status(200).json(products);
    } catch (error) {
        console.log(error); // Registrar el error en la consola para su análisis
        res.status(500).json({ message: 'Error getting products by name' });
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

// Define el esquema de validación para un producto
const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    category: Joi.string().required(),
    stock: Joi.number().integer().min(0).required(),
    size: Joi.string().required(),
    image: Joi.string().required(),
});

const createProductController = async (req, res) => {
    const productData = req.body;

    // Verificar si se envió un objeto de producto o una matriz de productos
    const products = Array.isArray(productData) ? productData : [productData];

    try {
        const createdProducts = [];
        const duplicateProducts = [];

        for (const product of products) {
            // Validar el producto utilizando el esquema definido
            const { error } = productSchema.validate(product);

            if (error) {
                return res
                    .status(400)
                    .json({ message: 'Invalid product data', error });
            }

            try {
                const createdProduct = await createProduct(product);
                createdProducts.push(createdProduct);
            } catch (error) {
                // Si se produce un error de llave duplicada, omitir el producto y continuar con los demás
                if (error.message === 'Duplicate product') {
                    console.log(`Skipping duplicate product: ${product.name}`);
                    duplicateProducts.push(product);
                    continue;
                }
                throw error; // Relanzar el error para que se maneje en el bloque catch externo
            }
        }

        if (createdProducts.length > 0) {
            if (duplicateProducts.length > 0) {
                res.status(201).json({
                    message: 'Products created successfully',
                    products: createdProducts,
                    duplicateProducts: duplicateProducts,
                });
            } else {
                res.status(201).json({
                    message: 'Products created successfully',
                    products: createdProducts,
                });
            }
        } else {
            if (duplicateProducts.length > 0) {
                res.status(400).json({
                    message: 'Duplicate product',
                    duplicateProducts: duplicateProducts,
                });
            } else {
                res.status(400).json({ message: 'No products were created' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating the products' });
    }
};

const updateProductController = async (req, res) => {
    const { id } = req.params;
    const updatedProductData = req.body;

    try {
        const updatedProduct = await updateProduct(id, updatedProductData);

        if (updatedProduct) {
            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating the product' });
    }
};

module.exports = {
    getAllProductsController,
    getProductsNameController,
    getProductByIdController,
    deleteProductController,
    createProductController,
    updateProductController,
};
