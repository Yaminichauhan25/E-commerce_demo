"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
exports.options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce Express API with Swagger',
            version: '1.0.0',
            description: 'API documentation for E-commerce Express API with Swagger',
        },
        security: [
            {
                bearerAuth: [],
                basicAuth: [],
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "apiKey",
                    name: "authorization",
                    scheme: "bearer",
                    in: "header",
                },
                basicAuth: {
                    type: 'http',
                    scheme: 'basic',
                },
            },
        },
        paths: {
            '/signup': {
                post: {
                    tags: ['onboarding'],
                    description: 'used to signup',
                    requestBody: {
                        description: 'Signup credentials',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        firstName: { type: 'string', example: 'Yamini' },
                                        lastName: { type: 'string', example: 'chauhan' },
                                        email: { type: 'string', example: 'example@example.com' },
                                        password: { type: 'string', example: 'Password@123' },
                                        phoneNumber: { type: 'string', example: '+9187765678' },
                                        dob: { type: 'string', example: '25-7-2000' },
                                        gender: { type: 'string', example: 'male or female' },
                                    },
                                    required: ['email', 'password'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'Successful signedup' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [],
                },
            },
            '/login': {
                post: {
                    tags: ['onboarding'],
                    description: 'used to login',
                    requestBody: {
                        description: 'login credentials',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        email: { type: 'string', example: 'example@example.com' },
                                        password: { type: 'string', example: 'Password@123' },
                                    },
                                    required: ['email', 'password'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'logged in successfully' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [],
                },
            },
            '/forgotpassword': {
                post: {
                    tags: ['onboarding'],
                    description: 'used to forgotpassword',
                    requestBody: {
                        description: 'forgotpassword credentials',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        email: { type: 'string', example: 'example@example.com' },
                                        phoneNumber: { type: 'string', example: '+91855465767' },
                                    },
                                    required: ['email', 'phoneNumber'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'otp sent successfully' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [
                        {
                            bearerAuth: [], // Include the bearerAuth security scheme for this endpoint
                        },
                    ],
                },
            },
            '/resetPassword': {
                post: {
                    tags: ['onboarding'],
                    description: 'used to resetPassword',
                    requestBody: {
                        description: 'resetpassword credentials',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        password: { type: 'string', example: 'Password@12345' },
                                        confirmPassword: { type: 'string', example: 'Password@12345' },
                                    },
                                    required: ['password', 'confirmPassword'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'password updated successfully' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [
                        {
                            bearerAuth: [], // Include the bearerAuth security scheme for this endpoint
                        },
                    ],
                },
            },
            '/getProfile': {
                get: {
                    tags: ['onboarding'],
                    description: 'used to fetch user data',
                    responses: {
                        '200': { description: 'successfull' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [
                        {
                            bearerAuth: [], // Include the bearerAuth security scheme for this endpoint
                        },
                    ],
                },
            },
            '/updateProfile/{id}': {
                put: {
                    tags: ['onboarding'],
                    description: 'used to update profile',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            description: 'ID of the profile to update',
                            required: true,
                            schema: {
                                type: 'string', // Change the type as needed
                            },
                        },
                    ],
                    requestBody: {
                        description: 'update profile credentials',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        firstName: { type: 'string', example: 'Yamini' },
                                        lastName: { type: 'string', example: 'chauhan' },
                                        phoneNumber: { type: 'string', example: '+9187765678' },
                                        dob: { type: 'string', example: '25-7-2000' },
                                        gender: { type: 'string', example: 'male or female' },
                                    },
                                    // required: ['email', 'password'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'profile updated successfully' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [
                        {
                            bearerAuth: [], // Include the bearerAuth security scheme for this endpoint
                        },
                    ],
                },
            },
            '/logout': {
                post: {
                    tags: ['onboarding'],
                    description: 'used to logout',
                    responses: {
                        '200': { description: 'logout successfully' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [
                        {
                            bearerAuth: [], // Include the bearerAuth security scheme for this endpoint
                        },
                    ],
                },
            },
            '/create': {
                post: {
                    tags: ['product'],
                    description: 'used to create product',
                    requestBody: {
                        description: 'create product credentials',
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string', example: 'vivo v5' },
                                        description: { type: 'string', example: 'latest generation' },
                                        size: { type: 'string', example: 'xl' },
                                        categories: { type: 'string', example: 'mobiles' },
                                        price: { type: 'string', example: '17999' },
                                        color: { type: 'string', example: 'black' },
                                        image: { type: 'file', },
                                    },
                                    // required: ['email', 'password'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'product successfully' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [
                        {
                            bearerAuth: [], // Include the bearerAuth security scheme for this endpoint
                        },
                    ],
                },
            },
            '/getProducts': {
                get: {
                    tags: ['product'],
                    description: 'used to fetch user data',
                    responses: {
                        '200': { description: 'successfull' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [
                        {
                            bearerAuth: [], // Include the bearerAuth security scheme for this endpoint
                        },
                    ],
                },
            },
            '/getProductById/{id}': {
                get: {
                    tags: ['product'],
                    description: 'used to fetch user data by id',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            description: 'ID of the product to update',
                            required: true,
                            schema: {
                                type: 'string', // Change the type as needed
                            },
                        },
                    ],
                    responses: {
                        '200': { description: 'successfull' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [
                        {
                            bearerAuth: [], // Include the bearerAuth security scheme for this endpoint
                        },
                    ],
                },
            },
            '/removeProductById/{id}': {
                delete: {
                    tags: ['product'],
                    description: 'used to remove product by id',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            description: 'ID of the product to remove',
                            required: true,
                            schema: {
                                type: 'string', // Change the type as needed
                            },
                        },
                    ],
                    responses: {
                        '200': { description: 'successfull' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [
                        {
                            bearerAuth: [], // Include the bearerAuth security scheme for this endpoint
                        },
                    ],
                },
            },
            "/addtocart": {
                post: {
                    tags: ["cart"],
                    description: "used to add product to cart",
                    requestBody: {
                        description: "add to cart credentials",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        userId: {
                                            "type": "string"
                                        },
                                        cartItems: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                "properties": {
                                                    "quantity": {
                                                        "type": "string"
                                                    },
                                                    "productId": {
                                                        "type": "string"
                                                    },
                                                    "price": {
                                                        "type": "string"
                                                    }
                                                },
                                                "required": ["quantity", "productId", "price"]
                                            }
                                        }
                                    },
                                    required: ["userId", "cartItems"]
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            "description": "product added successfully to cart"
                        },
                        400: {
                            "description": "Bad request"
                        },
                        500: {
                            "description": "Internal server error"
                        }
                    },
                    security: [
                        {
                            "bearerAuth": []
                        }
                    ]
                }
            },
            '/getCart': {
                get: {
                    tags: ['cart'],
                    description: 'used to fetch cart data',
                    responses: {
                        '200': { description: 'successfull' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [
                        {
                            bearerAuth: [], // Include the bearerAuth security scheme for this endpoint
                        },
                    ],
                },
            },
            '/deleteProductFromCart/{id}': {
                delete: {
                    tags: ['cart'],
                    description: 'used to remove product from cart by id',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            description: 'ID of the product to remove from cart',
                            required: true,
                            schema: {
                                type: 'string', // Change the type as needed
                            },
                        },
                    ],
                    requestBody: {
                        description: 'remove product from cart',
                        content: {
                            "application/json": {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        userId: { type: 'string', },
                                    },
                                    // required: ['email', 'password'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'successfull' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [
                        {
                            bearerAuth: [], // Include the bearerAuth security scheme for this endpoint
                        },
                    ],
                },
            },
            '/deletecart/{id}': {
                delete: {
                    tags: ['cart'],
                    description: 'used to remove cart by id',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            description: 'provide id of cart to remove',
                            required: true,
                            schema: {
                                type: 'string', // Change the type as needed
                            },
                        },
                    ],
                    responses: {
                        '200': { description: 'successfull' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [
                        {
                            bearerAuth: [], // Include the bearerAuth security scheme for this endpoint
                        },
                    ],
                },
            },
            "/addToWishlist": {
                post: {
                    tags: ["wishlist"],
                    description: "used to add product to wishlist",
                    requestBody: {
                        description: "add to wishlist credentials",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        userId: {
                                            "type": "string"
                                        },
                                        products: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    productId: {
                                                        "type": "string"
                                                    },
                                                },
                                            }
                                        }
                                    },
                                    required: ["userId", "products"]
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            "description": "product added successfully to wishlist"
                        },
                        400: {
                            "description": "Bad request"
                        },
                        500: {
                            "description": "Internal server error"
                        }
                    },
                    security: [
                        {
                            "bearerAuth": []
                        }
                    ]
                }
            },
            '/getWishlist': {
                get: {
                    tags: ['wishlist'],
                    description: 'used to fetch wishlist data',
                    responses: {
                        '200': { description: 'successfull' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [
                        {
                            bearerAuth: [], // Include the bearerAuth security scheme for this endpoint
                        },
                    ],
                },
            },
            '/removeProductFromWishlist/{id}': {
                delete: {
                    tags: ['wishlist'],
                    description: 'used to remove product from wishlist by id',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            description: 'ID of the product to remove from cart',
                            required: true,
                            schema: {
                                type: 'string', // Change the type as needed
                            },
                        },
                    ],
                    requestBody: {
                        description: 'remove product from cart',
                        content: {
                            "application/json": {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        userId: { type: 'string', },
                                    },
                                    // required: ['email', 'password'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'successfull' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [
                        {
                            bearerAuth: [], // Include the bearerAuth security scheme for this endpoint
                        },
                    ],
                },
            },
            '/removeWishlist/{id}': {
                delete: {
                    tags: ['wishlist'],
                    description: 'used to remove wishlist by id',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            description: 'provide id of wishlist to remove',
                            required: true,
                            schema: {
                                type: 'string', // Change the type as needed
                            },
                        },
                    ],
                    responses: {
                        '200': { description: 'successfull' },
                        '400': { description: 'Bad request' },
                        '500': { description: 'Internal server error' },
                    },
                    security: [
                        {
                            bearerAuth: [], // Include the bearerAuth security scheme for this endpoint
                        },
                    ],
                },
            },
        },
    },
    // Add the correct 'apis' field with the path to your controller or route file
    apis: ['src/routes/index.ts'], // Replace with the path to your controller file
};
