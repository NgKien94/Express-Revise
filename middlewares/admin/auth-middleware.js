const system = require('../../configs/system')
const systemConfig = require('../../configs/system')
const Account = require('../../models/account-model')

module.exports.requireAuth = async (req,res,next) =>{
    if(!req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return;
    }
    else{
        const user = await Account.findOne({
            token: req.cookies.token
        })
        
        if(!user){
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
            return;
        }
        
        next();
    }
    
}