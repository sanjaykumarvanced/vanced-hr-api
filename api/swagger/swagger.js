const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const version = require("../../package.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hr Dashboard Api Docs",
    //   version,
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          schema: "bearer",
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
  apis: ["./api/router.js", "./models/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, PORT) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("docs.json", (req, res) => {
    res.setHeader("Content-Type", "application?json");
    res.send(swaggerSpec);
  });
  console.log(`Server running on port ${PORT}`);
}
module.exports = swaggerDocs;
