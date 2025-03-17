const systemConfig = require('../../configs/system')

module.exports.createAccount = (req,res,next) =>{
    
    if(!req.body.fullName){
        req.flash('error',"Vui lòng nhập tên đầy đủ")
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
        return ;
    }

    if(!req.body.email){
        req.flash('error',"Vui lòng nhập email")
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
        return ;
    }

    if(!req.body.password){
        req.flash('error',"Vui lòng điền mật khẩu")
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
        return ;
    }

    next()
    //end check title
    
}