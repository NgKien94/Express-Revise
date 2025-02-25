const dashboardRoute = require('./dashboard-route');
const productRoute = require('./products-route');
const productCategoryRoute = require('./products-category-route');
const prefixAdminPath = require('../../configs/system')


module.exports = (app) =>{
    const PATH = prefixAdminPath.prefixAdmin;
    app.use(PATH + '/dashboard', dashboardRoute)
    
    app.use(PATH + '/products', productRoute)

    app.use(PATH+'/products-category',productCategoryRoute)
}