const systemConfig = require('../../configs/system')

module.exports.createProduct = (req,res,next) =>{
    //check title
    if(!req.body.title){
        req.flash('error',"Vui lòng nhập tiêu đề")
        res.redirect(`${systemConfig.prefixAdmin}/products/createProduct`)
        return ;
    }
    next()
    //end check title
    
}