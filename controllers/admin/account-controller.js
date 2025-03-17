const Account = require('../../models/account-model')
const Role = require('../../models/role-model')
const systemConfig = require('../../configs/system')
const md5 = require('md5')

module.exports.index =  async (req,res) => {
    const records = await Account.find({deleted: false}).select('-password -token')
    for( let i = 0 ; i < records.length ; i++){
        let roleRecord = await Role.findOne({
            deleted:false,
            _id: records[i].role_id
        })
        if(roleRecord){
            records[i].role = roleRecord
        }
    }

    console.log(records)
    res.render('admin/pages/accounts/index.pug',{
        pageTitle: "Quản lý tài khoản",
        records: records
    })
}

module.exports.viewCreate = async (req,res) => {
    const roles = await Role.find({deleted: false})
    res.render('admin/pages/accounts/create.pug', {
        pageTitle: 'Thêm mới tài khoản',
        roles: roles
    })
}


module.exports.createAccount = async (req,res) => {

    const existEmail = await Account.findOne({
        deleted: false,
        email: req.body.email
    })

    if(!existEmail) {
        if(req.body.password){
            req.body.password = md5(req.body.password)
        }
        
        console.log(req.body)
        const newAccount = new Account(req.body)
        await newAccount.save();
        req.flash('success','Tạo tài khoản thành công');
        res.redirect(`${systemConfig.prefixAdmin}/accounts/`);
    }
    else {
        req.flash('error','Email đã tồn tại');
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
    }

   
}