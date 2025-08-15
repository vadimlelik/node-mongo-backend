const swaggerUi = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

// Load central OpenAPI spec from YAML
const swaggerDocument = YAML.load(path.join(__dirname, 'docs/openapi.yaml'));

module.exports = function (app) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
