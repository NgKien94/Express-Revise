const express = require('express')
const controller = require('../../controllers/admin/products-controller')
const route = express.Router();

//GET PRODUCTS
route.get('/', controller.index)


// PATCH - Change status a product

route.patch('/change-status-product/:status/:id',controller.changeStatusProduct)

//PATCH - Change Status list products
route.patch('/change-multi',controller.changeListProducts)

//DELETE - Delete A Product
route.delete('/delete-product/:id',controller.delete_A_Product)


module.exports = route;