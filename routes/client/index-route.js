// đăng ký các route , dùng middleWare hoặc đăng ký tiền tố cho các route con
const homeRoutes = require('./home-route');
const productRoutes = require('./products-route')

module.exports = (app) =>{
    app.use('/', homeRoutes);

    app.use('/products',productRoutes)
   
}