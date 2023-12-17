"use strict";
/**
 * @swagger
 * definition:
 *   Error:
 *     properties:
 *       message:
 *         type: string
 */
/**
 * @swagger
 * /api/endpoint:
 *   get:
 *     summary: Get data
 *     description: Retrieve some data
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
/**
 * @swagger
 * definitions:
 *   Error:
 *     properties:
 *       message:
 *         type: string
 *   Product:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       size:
 *         type: string
 *       categories:
 *         type: array
 *         items:
 *           type: string
 *       color:
 *         type: string
 *       price:
 *         type: number
 *       image:
 *         type: string
 */
/**
 * @swagger
 * /api/products/create:
 *   post:
 *     summary: Create a new product
 *     description: Endpoint to create a new product.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/definitions/Product'
 *     parameters:
 *       - name: image
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Product added successfully
 *         schema:
 *           $ref: '#/definitions/Product'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
/**
 * @swagger
 * /api/products/getProducts:
 *   get:
 *     summary: Get all products
 *     description: Endpoint to retrieve all products. Returns cached data if available, otherwise fetches from the database.
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Product'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
/**
 * @swagger
 * /api/products/getProductById:
 *   get:
 *     summary: Get a product by ID
 *     description: Endpoint to retrieve a product by ID.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/Product'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
/**
 * @swagger
 * /api/products/removeProductById:
 *   delete:
 *     summary: Remove a product by ID
 *     description: Endpoint to remove a product by ID.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Product removed successfully
 *         schema:
 *           $ref: '#/definitions/Product'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
