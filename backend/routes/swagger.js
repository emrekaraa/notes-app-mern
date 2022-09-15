const express = require("express");
const router = express.Router();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: "1.0.0",
      description: "Notes API - Simple Express Rest API",
      contact: {
        name: "Emre Kara",
        url: "https://emrekara.dev",
        email: "emrekara.dev@gmail.com",
      },
      servers: [{ url: "http://localhost:4000" }],
    },
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

const specs = swaggerJsDoc(swaggerOptions);
router.use("/", swaggerUI.serve, swaggerUI.setup(specs));

module.exports = router;
