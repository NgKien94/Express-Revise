const express = require('express')
const route =  express.Router()
const controller = require('../../controllers/admin/account-controller')

const multer = require('multer')
const upload = multer()
const middlewareUploadCloud = require('../../middlewares/admin/uploadCloud-middleware')
const validateAccounts = require('../../validates/admin/validate-account')



//[GET] /admin/accounts/
route.get('/',controller.index)

//[GET] /admin/accounts/create
route.get('/create',controller.viewCreate)



//[POST] /admin/accounts/create
route.post('/create',
    upload.single('thumbnail'),
    middlewareUploadCloud.uploadCloud,
    validateAccounts.createAccount,
    controller.createAccount)



module.exports = route;