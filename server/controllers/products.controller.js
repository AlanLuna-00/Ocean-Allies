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
        const gender = req.query.gender || null;
        const active = req.query.active || null;

        const result = await getAllProducts(
            page,
            pageSize,
            category,
            price,
            size,
            name,
            sort,
            color,
            gender,
            active
        );

        if (!result) {
            let message = `No results found`;

            // Verificar si los filtros, excepto name y page, están vacíos
            if (category || price || size || sort || color || active) {
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

const cloudinary = require('../middleware/cloudinary');
const fs = require('fs');

const createProductController = async (req, res) => {
    let productData = req.body;

    const { size } = productData;
    const parsedSize = typeof size === 'string' ? JSON.parse(size) : size;

    productData.size = parsedSize;

    const products = Array.isArray(productData) ? productData : [productData];

    try {
        const createdProducts = [];
        const invalidProducts = [];

        for (const product of products) {
            const { error } = validateProduct(product);

            if (error) {
                invalidProducts.push({
                    product,
                    error: error.details[0].message,
                });
            } else {
                try {
                    let imageUrl;

                    if (product.image) {
                        // Si se proporciona una URL de imagen
                        imageUrl = await uploadUrlToCloudinary(product.image);
                    } else if (req.file) {
                        // Si se carga un archivo a través de Multer
                        const result = await uploadFileToCloudinary(req.file);
                        imageUrl = result.secure_url;
                    }

                    const createdProduct = await createProduct({
                        ...product,
                        image: imageUrl,
                    });
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

// Función para validar el producto (sin utilizar Joi)
const validateProduct = (product) => {
    // Realiza las validaciones deseadas para el producto
    // Retorna un objeto { error } en caso de error, o un objeto vacío en caso contrario
    // Por ejemplo:
    if (!product.name) {
        return { error: 'Product name is required' };
    }

    if (!product.price) {
        return { error: 'Product price is required' };
    }

    return {}; // Retorna un objeto vacío si no hay errores
};

// Función para subir un archivo a Cloudinary
const uploadFileToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

// Función para subir una imagen por URL a Cloudinary
const uploadUrlToCloudinary = (imageUrl) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(imageUrl, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url);
            }
        });
    });
};

const updateProductController = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        let imageUrl;

        if (req.file) {
            // Si se carga un archivo a través de Multer
            const result = await uploadFileToCloudinary(req.file);
            imageUrl = result.secure_url;
        } else {
            // Si no se proporciona una nueva imagen, mantener la imagen existente
            imageUrl = updatedData.image;
        }

        const updatedProduct = await updateProduct(id, {
            ...updatedData,
            image: imageUrl,
        });

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
