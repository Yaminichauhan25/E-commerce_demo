"use strict";
// import { APP_CONFIG } from "../constants/constant";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
// const options = {
//     definition: {
//       openapi: "3.0.1",
//       info: {
//         title: "E-commerce Express API with Swagger",
//         version: "6.1.0",
//       },
//       servers: [
//         {
//           url: APP_CONFIG.url,
//         },
//       ],
//       components: {
//         securitySchemes: {
//           bearerAuth: {
//             type: "apiKey",
//             name: "authorization",
//             scheme: "bearer",
//             in: "header",
//           },
//         },
//       },
//       security: [
//         {
//           bearerAuth: [],
//         },
//       ],
//     },
//     apis: ["./src/routes/product.routes.ts"],
//   };
//   export default options;
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
                'forgot-password': [],
                basicAuth: [],
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
                'forgot-password': {
                    type: 'apiKey',
                    in: 'header',
                    name: 'X-Forgot-Password-Token',
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
                                        firstName: {
                                            type: 'string',
                                            example: 'Yamini',
                                        },
                                        lastName: {
                                            type: 'string',
                                            example: 'chauhan',
                                        },
                                        email: {
                                            type: 'string',
                                            example: 'example@example.com',
                                        },
                                        password: {
                                            type: 'string',
                                            example: 'Password@123',
                                        },
                                        phoneNumber: {
                                            type: 'string',
                                            example: "+9187765678"
                                        },
                                    },
                                    required: ['email', 'password'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Successful signedup',
                        },
                        '400': {
                            description: 'Bad request',
                        },
                        '401': {
                            description: 'Unauthorized',
                        },
                    },
                    security: [],
                },
            },
        },
    },
    // Add the correct 'apis' field with the path to your controller or route file
    apis: ['./src/routes/user.routes.ts'], // Replace with the path to your controller file
};
