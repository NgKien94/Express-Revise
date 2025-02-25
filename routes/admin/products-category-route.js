const express = require('express')

const route = express.Router()
const controller = require('../../controllers/admin/products-category-controller')

const validateCategory = require('../../validates/admin/validate-category')

const multer = require('multer')
const upload = multer()
const middlewareUploadCloud = require('../../middlewares/admin/uploadCloud-middleware')


//[GET] /products-category
route.get('/',controller.index)

//[GET] /products-category/viewCreate-category
route.get('/viewCreate-category',controller.viewCreate)

//[POST] /products-category/create-category
route.post(
    '/create-category',
    upload.single('thumbnail'),
    middlewareUploadCloud.uploadCloud,
    validateCategory.createCategory,
    controller.create)


module.exports = route;