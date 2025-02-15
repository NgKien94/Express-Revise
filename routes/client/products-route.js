const express = require('express');
const controller = require('../../controllers/client/products-controller')
const route = express.Router();

// [GET] View homepage client
route.get('/',controller.index)


//[GET] View list of products client 

route.get('/detail/:slug',controller.detail)

module.exports = route;