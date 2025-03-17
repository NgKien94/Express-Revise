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


module.exports.viewEdit = async (req,res) => {
    try{
        const data = await Account.findOne({
            deleted: false,
            _id: req.params.id
        })
    
        const roles = await Role.find({
            deleted: false
        })
    
        res.render('admin/pages/accounts/edit.pug', {
            pageTitle: 'Cập nhật tài khoản',
            data: data,
            roles: roles
        })
    }catch(error){
        req.flash('error','Tài nguyên không tồn tại')
        res.redirect(`${systemConfig.prefixAdmin}/pages/accounts`)

    }
}


module.exports.editAccount = async (req,res) => {
    const id = req.params.id;

    const isExistEmail = await Account.findOne({
        _id : {$ne : id},
        email: req.body.email,
        deleted: false
    })

    if(!isExistEmail){

        if(req.body.password){
            req.body.password = md5(req.body.password);
        }
        else{
            delete req.body.password
        }
        console.log("records update: ",req.body)

        await Account.updateOne( {_id: id},req.body)
        req.flash('success','Cập nhật tài khoản thành công')
        res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/accounts`)
    }
    else{
        req.flash('error','Email đã tồn tại')
        res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/accounts`)
    }
}
