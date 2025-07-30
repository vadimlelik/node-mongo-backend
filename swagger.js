const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'Документация API пользователей, профессий и качеств',
    },
    servers: [
      {
        url: 'http://94.228.114.203:3004',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = function (app) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
