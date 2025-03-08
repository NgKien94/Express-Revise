const express = require('express')
const route = express.Router()
const controller = require('../../controllers/admin/role-controller')

//[GET] /admin/roles
route.get('/',controller.index)

//[GET] /admin/roles/viewCreate
route.get('/create',controller.viewCreate)

//[POST] /admin/roles/create
route.post('/create',controller.create)

//[GET] /admin/roles/edit/:id
route.get('/edit/:id',controller.viewEdit)


//[PATCH] /admin/roles/edit/:id
route.patch('/edit/:id',controller.edit)

module.exports = route;