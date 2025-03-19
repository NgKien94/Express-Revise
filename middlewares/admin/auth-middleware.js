const system = require('../../configs/system')
const systemConfig = require('../../configs/system')
const Account = require('../../models/account-model')
const Role = require('../../models/role-model')

module.exports.requireAuth = async (req,res,next) =>{
    if(!req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return;
    }
    else{
        const user = await Account.findOne({
            token: req.cookies.token
        }).select("-password -token")
        
        if(!user){
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
            return;
        }
        const role = await Role.findOne({
            _id: user.role_id,
            deleted: false
        }).select("title permissions")
        
        res.locals.user = user;
        res.locals.role = role;
        next();
    }
    
}