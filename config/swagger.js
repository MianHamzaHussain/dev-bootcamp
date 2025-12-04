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
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'User ID',
            example: '5d8a234a62935d3c5c402e38'
          },
          name: {
            type: 'string',
            example: 'John Doe'
          },
          email: {
            type: 'string',
            example: 'john.doe@example.com'
          },
          role: {
            type: 'string',
            example: 'user'
          }
        }
      },
      Bootcamp: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '5d713995b721c3bb38c1f5d0'
          },
          name: {
            type: 'string',
            example: 'Devworks Bootcamp'
          },
          description: {
            type: 'string',
            example: 'Devworks is a full stack JavaScript Bootcamp...'
          },
          website: {
            type: 'string',
            example: 'https://devworks.com'
          },
          phone: {
            type: 'string',
            example: '(111) 111-1111'
          },
          email: {
            type: 'string',
            example: 'enroll@devworks.com'
          },
          address: {
            type: 'string',
            example: '233 Bay State Rd Boston MA 02215'
          },
          careers: {
            type: 'array',
            items: {
              type: 'string'
            },
            example: ['Web Development', 'UI/UX', 'Business']
          },
          averageRating: {
            type: 'number',
            example: 9
          },
          averageCost: {
            type: 'number',
            example: 10000
          },
          housing: {
            type: 'boolean',
            example: true
          },
          jobAssistance: {
            type: 'boolean',
            example: true
          }
        }
      },
      Course: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '5d725a4a7b292f5f8ceff789'
          },
          title: {
            type: 'string',
            example: 'Front End Web Development'
          },
          description: {
            type: 'string',
            example: 'This course will provide you with all of the essentials...'
          },
          weeks: {
            type: 'string',
            example: '8'
          },
          tuition: {
            type: 'number',
            example: 8000
          },
          minimumSkill: {
            type: 'string',
            enum: ['beginner', 'intermediate', 'advanced'],
            example: 'beginner'
          },
          scholarshipAvailable: {
            type: 'boolean',
            example: true
          },
          bootcamp: {
            type: 'string',
            description: 'The ID of the bootcamp this course belongs to',
            example: '5d713995b721c3bb38c1f5d0'
          }
        }
      },
      Review: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '603fe2a2cde5574e681322a2'
          },
          title: {
            type: 'string',
            example: 'Great Bootcamp!'
          },
          text: {
            type: 'string',
            example: 'This was a great bootcamp, I learned a lot.'
          },
          rating: {
            type: 'number',
            description: 'Rating between 1 and 10',
            example: 9
          },
          bootcamp: {
            type: 'string',
            description: 'The ID of the bootcamp being reviewed',
            example: '5d713995b721c3bb38c1f5d0'
          },
          user: {
            type: 'string',
            description: 'The ID of the user who wrote the review',
            example: '5d8a234a62935d3c5c402e38'
          }
        }
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
