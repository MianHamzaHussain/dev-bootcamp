import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "DevCamp API",
    version: process.env.API_VERSION || "1.0.0",
    description:
      "This is the backend REST API for the DevCamp application, a directory for coding bootcamps.",
    contact: {
      name: process.env.CONTACT_NAME || "API Support",
      email: process.env.CONTACT_EMAIL || "support@example.com",
    },
  },
  servers: [
    {
      url: `${process.env.SERVER_URI || "http://localhost:5000"}/api/v1`,
      description: "Development server",
    },
  ],
  // Defines the security scheme used in the API
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  }
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js", "./controllers/*.js", "./docs/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
