const express = require('express')
const route = express.Router();
const controller = require('../../controllers/admin/auth-controller')

route.get('/login', controller.index);

route.post('/login', controller.login);

route.get('/logout', controller.logout);

module.exports = route;

