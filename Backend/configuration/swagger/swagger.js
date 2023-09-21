import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
//Swagger options including bearer token configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BankLingo API",
      description: "Rest API For The BankLingo Application, Comprising of all the CRUD Operations.",
      version: "1.0.1",
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
    security: [{ bearerAuth: [] }],
  },
  // looks for configuration in specified directories
  apis: [
    "./routes/UserRoutes/*.js",
    "./routes/GptRoutes/*.js",
    "./routes/SearchRoutes/*.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // Swagger Page
  app.use("/banklingodocs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
