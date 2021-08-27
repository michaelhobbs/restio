const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('openapi/api.yaml');

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(3030);
