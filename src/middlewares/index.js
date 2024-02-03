const yaml = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const express = require('express');

const swaggerDocument = yaml.load('./notebook.yaml');

const applyMiddleware = (app) => {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};
module.exports = applyMiddleware;
