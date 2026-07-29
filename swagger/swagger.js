const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Calendar API",
      version: "1.0.0",
      description: `
API REST desarrollada con Node.js, Express y MongoDB.

Características:
- Autenticación JWT
- CRUD de eventos
- Validación con express-validator
- Persistencia con MongoDB Atlas
- Desplegada en Railway
`,
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:4002/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
