const { response } = require('express')
const systemConfig = require('../../configs/system')
const Role = require('../../models/role-model')

//[GET] /admin/roles
module.exports.index = async (req, res) => {
    const records = await Role.find({ deleted: false })


    res.render('admin/pages/roles/index.pug', {
        pageTitle: 'Danh sách nhóm quyền',
        records: records
    })
}



//[GET] /admin/roles/create
module.exports.viewCreate = (req, res) => {


    res.render('admin/pages/roles/create.pug', {
        pageTitle: 'Tạo mới nhóm quyền'
    })
}

//[POST] /admin/roles/create
module.exports.create = async (req, res) => {

    const newRole = new Role(req.body)
    await newRole.save()
    req.flash('success', "Tạo mới nhóm quyền thành công");
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

//[GET] /admin/roles/edit
module.exports.viewEdit = async (req, res) => {
    try {
        const id = req.params.id
        const record = await Role.findOne({ _id: id })

        res.render('admin/pages/roles/edit.pug', {
            pageTitle: 'Tạo mới nhóm quyền',
            record: record
        })
    } catch (error) {
        console.log(error)
        req.flash('error', "Có lỗi xảy ra khi chỉnh sửa nhóm quyền")
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}


//[PATCH] /admin/roles/edit
module.exports.edit = async (req, res) => {
    const id = req.params.id
    await Role.updateOne({ _id: id }, req.body)
    req.flash('success', "Chỉnh sửa nhóm quyền thành công");
    res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/roles`)
}

//[GET] /admin/roles/permissions
module.exports.viewPermissions = async (req,res) =>{
    const records = await Role.find({deleted: false});
    console.log(records);
    res.render('admin/pages/roles/permissions.pug',{
        pageTitle: "Phân quyền",
        records: records
    })
}

//[PATCH] /admin/roles/permissions
module.exports.editPermissions = async (req,res) =>{
    const data = JSON.parse(req.body.permissions);
    data.forEach( async (item) =>{
        await Role.updateOne( {_id: item.id},{permissions: item.permissions});
    })
    req.flash('success', "Cập nhật phân quyền thành công");
    res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/roles/permissions`)
}