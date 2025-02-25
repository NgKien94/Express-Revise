const ProductCategory = require('../../models/product-category-model')
const systemConfig = require('../../configs/system')

// [GET] /products-category
module.exports.index = async (req,res) =>{
    let listCategory =  {
        deleted : false
    }

    const records = await ProductCategory.find(listCategory);
    console.log(records)


    res.render('admin/pages/category/index.pug',{
        pageTitle: 'Danh mục sản phẩm',
        records: records
    })
}

// [GET] /products-category/viewCreate-category
module.exports.viewCreate = (req,res) =>{
    res.render('admin/pages/category/create.pug',{
        pageTitle: 'Thêm danh mục sản phẩm'
    })
}

// [POST] /products-category/create-category
module.exports.create = async (req,res) =>{
    
    try {

        //handle position
        if (req.body.position) {
            req.body.position = parseInt(req.body.position)
        }
        else {
            req.body.position = await ProductCategory.countDocuments() + 1
        }
        //end handle position

        if(!req.body.thumbnail){
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