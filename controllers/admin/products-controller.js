const Product = require('../../models/product-model')
const filterHelpers = require('../../helpers/filterStatus');
const searchHelpers = require('../../helpers/search')
const paginationHelpers = require('../../helpers/pagination')

// [GET] List product
module.exports.index = async (req, res) => {


    let findObject = {
        deleted: false,

    }


    //Filter
    const filterStatus = filterHelpers(req.query); // cập nhật bộ lọc trả lại cho giao diện
    if (req.query.status) {
        findObject.status = req.query.status;
    }

    // End filter


    //Search
    const objectSearch = searchHelpers(req.query);
    if (objectSearch.regex) {
        findObject.title = objectSearch.regex;
    }
    //End Search


    // Pagination




    // Hiển thị số trang

    const totalProducts = await Product.countDocuments(findObject);

    const objectPagination = paginationHelpers({
        limitItems: 4,
        totalProducts: totalProducts
    }, req.query)

    /*
        {
            currentPage,
            limitItems
            totalPage,
            startIndex
        }
    */
    //End pagination

    const listProduct = await Product
        .find(findObject)
        .sort({ position: "desc" })
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skipItems)
    // Trang 1 => bỏ qua 0 sản phẩm đầu
    // Trang 2 => bỏ qua (2-1 )*4 = 4 sản phẩm đầu
    // Trang 3 => bỏ qua (3-1) * 4 =8 sản phẩm đầu



    res.render('admin/pages/products/index.pug', {
        pageTitle: 'Product Admin',
        products: listProduct,
        listFilter: filterStatus,
        keyword: objectSearch.keyword,
        objectPagination: objectPagination
    })
}


// [PATCH] product status
module.exports.changeStatusProduct = async (req, res) => {
    const requestStatus = req.params.status;
    const idProduct = req.params.id;
    const responseStatus = requestStatus == "active" ? "inactive" : "active";

    await Product.updateOne(
        { _id: idProduct },
        { $set: { status: responseStatus } }
    )
    req.flash('success', `Cập nhật trạng thái thành công cho sản phẩm`);
    res.redirect(req.get("Referrer") || "/admin/products")
}

//[PATCH] list product status
module.exports.changeListProducts = async (req, res) => {
    const requestType = req.body.type;
    const listIds = req.body.ids.split(',');

    switch (requestType) {
        case "active":
            await Product.updateMany(
                { _id: { $in: listIds } },
                { $set: { status: "active" } }
            )
            req.flash('success', `Cập nhật trạng thái thành công cho ${listIds.length} sản phẩm`);
            break;
        case "inactive":
            await Product.updateMany(
                { _id: { $in: listIds } },
                { $set: { status: "inactive" } }
            )
            req.flash('success', `Cập nhật trạng thái thành công cho ${listIds.length} sản phẩm`);
            break;
        case "delete-all":
            await Product.updateMany(
                { _id: { $in: listIds } },
                {
                    $set: {
                        deleted: true,
                        deletedAt: new Date()
                    }
                }
            )
            req.flash('success', `Xóa thành công ${listIds.length} sản phẩm`);

            break;
        case "change-position":
            for (const item of listIds) {
                let [id, newPosition] = item.split('-')
                newPosition = parseInt(newPosition)

                await Product.updateOne(
                    { _id: id },
                    { $set: { position: newPosition } }
                )
            }
            req.flash('success', `Cập nhật vị trí thành công cho ${listIds.length} sản phẩm`);
            break;
    }


    res.redirect(req.get('Referrer') || '/admin/products')
}


//[DELETE] Delete A product - 
module.exports.delete_A_Product = async (req, res) => {
    const idProduct = req.params.id

    //    await Product.deleteOne( 
    //         {_id: idProduct}
    //     ) // Certainly delete product

    await Product.updateOne(
        { _id: idProduct },
        {
            $set: {
                deleted: true,
                deletedAt: new Date()
            }
        }
    )


    res.redirect(req.get('Referrer') || '/admin/products')
}

// [GET] View UI Create A Product
module.exports.viewCreate_A_Product = (req, res) => {
    res.render('admin/pages/products/createProduct.pug', {
        pageTitle: 'Tạo mới sản phẩm'
    })
}

//[POST]  Create A Product 
module.exports.createProduct = async (req, res) => {

    try {

        req.body.price = parseFloat(req.body.price)
        req.body.discountPercentage = parseFloat(req.body.discountPercentage)
        req.body.stock = parseInt(req.body.stock)

        //handle position
        if (req.body.position) {
            req.body.position = parseInt(req.body.position)
        }
        else {
            req.body.position = await Product.countDocuments() + 1
        }
        //end handle position

        // handle file upload
        if (req.file) {
            req.body.thumbnail = `/uploads/${req.file.filename}`
        }
        //end handle file upload

        const newProduct = new Product(req.body)
        await newProduct.save()
        // // await Product.create(req.body) // có thể dùng bằng create (phương thức tĩnh của mongoose) hoặc save

        req.flash('success',"Tạo sản phẩm thành công")
        res.redirect('/admin/products')
    } catch (error) {
        console.log(error)
        req.flash('error',"Có lỗi xảy ra khi tạo sản phẩm")
        res.redirect('/admin/products')
    }
}
