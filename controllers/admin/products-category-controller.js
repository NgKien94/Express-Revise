const ProductCategory = require('../../models/product-category-model')
const systemConfig = require('../../configs/system')
const createTreeHelper = require('../../helpers/createTree')

// [GET] /products-category
module.exports.index = async (req, res) => {
    let listCategory = {
        deleted: false
    }

    const records = await ProductCategory.find(listCategory);
    const newRecords = createTreeHelper.tree(records)


    res.render('admin/pages/category/index.pug', {
        pageTitle: 'Danh mục sản phẩm',
        records: newRecords
    })
}

// [GET] /products-category/viewCreate-category
module.exports.viewCreate = async (req, res) => {
    let allCategory = {
        deleted: false
    }

    const records = await ProductCategory.find(allCategory)
    const newRecords = createTreeHelper.tree(records)


    res.render('admin/pages/category/create.pug', {
        pageTitle: 'Thêm danh mục sản phẩm',
        records: newRecords
    })
}

// [POST] /products-category/create-category
module.exports.create = async (req, res) => {

    try {

        //handle position
        if (req.body.position) {
            req.body.position = parseInt(req.body.position)
        }
        else {
            req.body.position = await ProductCategory.countDocuments() + 1
        }
        //end handle position

        if (!req.body.thumbnail) {
            req.body.thumbnail = ""
        }


        const newProduct = new ProductCategory(req.body)
        await newProduct.save()

        console.log(req.body)

        req.flash('success', "Tạo danh mục thành công")
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    } catch (error) {
        console.log(error)
        req.flash('error', "Có lỗi xảy ra khi tạo danh mục")
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }

}

// [GET] /products-category/edit/:id
module.exports.viewEdit = async (req, res) => {
    const id = req.params.id

    const record = await ProductCategory.findOne({ _id: id });
    const allRecord = await ProductCategory.find({ deleted: false });
    const listNode = createTreeHelper.tree(allRecord);

    res.render('admin/pages/category/edit.pug', {
        pageTitle: 'Chỉnh sửa danh mục',
        record: record,
        listNode: listNode
    })
}


// [PATCH] /products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id
        if(req.body.position){
            req.body.position = parseInt(req.body.position)
        }
        else{
            req.body.position = await ProductCategory.countDocuments() + 1
        }
        await ProductCategory.updateOne({ _id: id }, req.body)
        req.flash('success', "Chỉnh sửa danh mục thành công")
        res.redirect(req.get('Referrer') || `${systemConfig.prefixAdmin}/products-category`)
  
    } catch (error) {
        console.log(error)
        req.flash('error', "Có lỗi xảy ra khi chỉnh sửa danh mục vui lòng thử lại sau")
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
}
