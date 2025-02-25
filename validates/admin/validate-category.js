const systemConfig = require('../../configs/system')

module.exports.createCategory = (req,res,next) =>{
    //check title
    if(!req.body.title){
        req.flash('error',"Vui lòng nhập tiêu đề")
        res.redirect(`${systemConfig.prefixAdmin}/products-category/viewCreate-category`)
        return ;
    }
    next()
    //end check title
    
}