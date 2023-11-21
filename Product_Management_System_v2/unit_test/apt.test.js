const request = require('supertest');
const app = require('../app');

describe('Product Management System API', () => {
    // Test GET /products
    describe('GET /products', () => {
        it('should return all products', async () => {
            const response = await request(app).get('/products');
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
        });

        it('should return "No product found in database! Please add a product." if no products found', async () => {
            // Mock the Product.find() function to return undefined
            jest.spyOn(Product, 'find').mockResolvedValue(undefined);

            const response = await request(app).get('/products');
            expect(response.status).toBe(200);
            expect(response.text).toBe('No product found in database! Please add a product.');
        });
    });

    // Test GET /products/:id
    describe('GET /products/:id', () => {
        it('should return a product by id', async () => {
            const product = await Product.create({ name: 'Test Product', price: 10 });

            const response = await request(app).get(`/products/${product._id}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product.toJSON());
        });

        it('should return "Product not found!" if product not found', async () => {
            const response = await request(app).get('/products/invalid-id');
            expect(response.status).toBe(200);
            expect(response.text).toBe('Product not found!');
        });
    });

    // Test POST /products/add
    describe('POST /products/add', () => {
        it('should add a new product to the database', async () => {
            const productData = { name: 'New Product', price: 20 };

            const response = await request(app).post('/products/add').send(productData);
            expect(response.status).toBe(200);
            expect(response.text).toBe('Product added successfully.');
        });

        it('should return "Failed to add product!" if failed to add product', async () => {
            // Mock the newProduct.save() function to return an error
            jest.spyOn(Product.prototype, 'save').mockImplementationOnce((callback) => {
                callback(new Error('Failed to add product!'));
            });

            const productData = { name: 'New Product', price: 20 };

            const response = await request(app).post('/products/add').send(productData);
            expect(response.status).toBe(200);
            expect(response.text).toBe('Failed to add product!');
        });
    });

    // Test PUT /products/:id
    describe('PUT /products/:id', () => {
        it('should update product details', async () => {
            const product = await Product.create({ name: 'Test Product', price: 10 });
            const updatedProductData = { name: 'Updated Product', price: 15 };

            const response = await request(app).put(`/products/${product._id}`).send(updatedProductData);
            expect(response.status).toBe(200);
            expect(response.text).toBe('Product updated successfully.');
        });

        it('should return "Product not found!" if product not found', async () => {
            const response = await request(app).put('/products/invalid-id').send({ name: 'Updated Product', price: 15 });
            expect(response.status).toBe(200);
            expect(response.text).toBe('Product not found!');
        });
    });

    // Test DELETE /products/:id
    describe('DELETE /products/:id', () => {
        it('should delete a product by id', async () => {
            const product = await Product.create({ name: 'Test Product', price: 10 });

            const response = await request(app).delete(`/products/${product._id}`);
            expect(response.status).toBe(200);
            expect(response.text).toBe('Product deleted successfully.');
        });

        it('should return "Product not found!" if product not found', async () => {
            const response = await request(app).delete('/products/invalid-id');
            expect(response.status).toBe(200);
            expect(response.text).toBe('Product not found!');
        });
    });
});
