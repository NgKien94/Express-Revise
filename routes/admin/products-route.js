const express = require('express')
const controller = require('../../controllers/admin/products-controller')
const path = require('path')
const multer  = require('multer')
const route = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'../../public/uploads/'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()

      cb(null,  uniqueSuffix + '-'+file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

//GET PRODUCTS
route.get('/', controller.index)


// PATCH - Change status a product

route.patch('/change-status-product/:status/:id',controller.changeStatusProduct)

//PATCH - Change Status list products
route.patch('/change-multi',controller.changeListProducts)

//DELETE - Delete A Product
route.delete('/delete-product/:id',controller.delete_A_Product)

//GET - View UI Create A Product
route.get('/createProduct',controller.viewCreate_A_Product)

//POST - Create A Product
route.post('/create',upload.single('thumbnail'),controller.createProduct)


module.exports = route;