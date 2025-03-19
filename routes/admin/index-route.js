const dashboardRoute = require('./dashboard-route');
const productRoute = require('./products-route');
const productCategoryRoute = require('./products-category-route');
const rolesRoute = require('./role-route');
const accountRoute = require('./account-route')
const authRoute = require('./auth-route')
const authMiddleWare = require('../../middlewares/admin/auth-middleware')
const prefixAdminPath = require('../../configs/system')


module.exports = (app) =>{
    const PATH = prefixAdminPath.prefixAdmin;
    app.use(PATH + '/dashboard',authMiddleWare.requireAuth, dashboardRoute)
    
    app.use(PATH + '/products',authMiddleWare.requireAuth, productRoute)

    app.use(PATH+'/products-category',authMiddleWare.requireAuth,productCategoryRoute)

    app.use(PATH+'/roles',authMiddleWare.requireAuth,rolesRoute)

    app.use(PATH+'/accounts',authMiddleWare.requireAuth,accountRoute)

    app.use(PATH+'/auth',authRoute)
}