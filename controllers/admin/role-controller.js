const systemConfig = require('../../configs/system')
const Role = require('../../models/role-model')

//[GET] /admin/roles
module.exports.index =  async (req,res) =>{
    const records = await Role.find({deleted: false})


    res.render('admin/pages/roles/index.pug',{
        pageTitle: 'Danh sách nhóm quyền',
        records: records
    })
}



//[GET] /admin/roles/create
module.exports.viewCreate = (req,res) =>{


    res.render('admin/pages/roles/create.pug',{
        pageTitle: 'Tạo mới nhóm quyền'
    })
}

//[POST] /admin/roles/create
module.exports.create = async (req,res) =>{
    const newRole = new Role(req.body)

    await newRole.save()

    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}