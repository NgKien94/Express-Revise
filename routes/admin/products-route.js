const express = require('express')
const controller = require('../../controllers/admin/products-controller')
const route = express.Router();
const validateProduct = require('../../validates/admin/validate-product')


const multer = require('multer')
const upload = multer()
const middlewareUploadCloud = require('../../middlewares/admin/uploadCloud-middleware')





//GET PRODUCTS
route.get('/', controller.index)


// PATCH - Change status a product

route.patch('/change-status-product/:status/:id', controller.changeStatusProduct)

//PATCH - Change Status list products
route.patch('/change-multi', controller.changeListProducts)

//DELETE - Delete A Product
route.delete('/delete-product/:id', controller.delete_A_Product)

//GET - View UI Create A Product
route.get('/createProduct', controller.viewCreate_A_Product)

//POST - Create A Product // -   /createProduct
route.post(
    '/createProduct',
    upload.single('thumbnail'),
    middlewareUploadCloud.uploadCloud,
    validateProduct.createProduct,
    controller.createProduct
)


//GET - VIEW Edit a product 
route.get('/editProduct/:id',controller.viewEdit_A_Product)

//PATCH - Edit a product
route.patch('/editProduct/:id',
    upload.single('thumbnail'),
    middlewareUploadCloud.uploadCloud,
    controller.editProduct)

// GET - View detail product
route.get("/detail/:id",controller.detail)

module.exports = route;