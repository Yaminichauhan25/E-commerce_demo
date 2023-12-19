import { Router } from "express";
import { productController } from "../controller/product.controller";
import upload from "../fileuploads/image";
import verifytoken from "../middleware/user.middleware";

const router = Router();
router.post(
  "/create",
  upload.single("image"),verifytoken,
  productController.createProduct
);
router.get(
    "/getProducts",verifytoken,
    productController.getProducts
  );
  router.get(
    "/getProductById/:id",verifytoken,
    productController.getProductById
  );
  router.delete(
    "/removeProductById/:id",
   verifytoken,productController.removeProductById
  );
export default router;


// //swaggerJSDoc implementation
// /**
//  * @swagger
//  * components:
//  *      schemas:
//  *          productModel:
//  *              type: object
//  *              required:
//  *                  -title
//  *                  -description
//  *                  -size
//  *                  -categories
//  *                  -color
//  *                  -price
//  *                   image
//  *              properties:
//  *                  title:
//  *                      type: string
//  *                      description: title of the product
//  *                      example: 'Trolly bag'
//  *                  description:
//  *                      type: string
//  *                      description: description about product
//  *                  size:
//  *                      type: string
//  *                      description: size of the product
//  *                      example: '41'
//  *                  categories:
//  *                      type: string
//  *                      description: category of the product
//  *                      example: 'Shoe'
//  *                  color:
//  *                      type: string
//  *                      description: colorof the product
//  *                      example: 'Red'
//  *                  price:
//  *                      type: number
//  *                      description: price of the product 
//  *                      example: 1800
//  *                  image:
//  *                      key: image
//  *                      type: string
//  *                      format: binary
//  *                      description: image must be a type of png/jpeg/jpg
//  *                      example: 'png/jpeg/jpg'
//  */

// /**
//  * @swagger
//  * /create:
//  *   post:
//  *     summary: Used to add product
//  *     description: API to add product
//  *     tags:
//  *       - Product
//  *     consumes:
//  *       - multipart/form-data  # Update to handle file uploads
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             $ref: '#components/schemas/productModel'
//  *     responses:
//  *       200:
//  *         description: Product added successfully
//  *       400:
//  *         description: Failed
//  */


// // /**
// //  * @swagger
// //  * /create:
// //  *  post:
// //  *      summary: Used to add product
// //  *      description: API to add product 
// //  *      tags:
// //  *        - Product
// //  *      consumes:
// //  *          - application/json
// //  *      requestBody:
// //  *          required: true
// //  *          content:
// //  *              application/json:
// //  *                  schema:
// //  *                      $ref: '#components/schemas/productModel'
// //  *      responses:
// //  *          200:
// //  *              description:  product added successfully
// //  *          400:
// //  *              description: failed
// //  */