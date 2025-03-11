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

//[GET] /admin/roles/permissions
route.get('/permissions',controller.viewPermissions)

//[PATCH] /admin/roles/permissions
route.patch('/permissions',controller.editPermissions)


module.exports = route;