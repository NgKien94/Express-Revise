const express = require('express');
const controller = require('../../controllers/client/products-controller')
const route = express.Router();

route.get('/',controller.index)

module.exports = route;