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

    const listProduct = await Product.find(findObject).limit(objectPagination.limitItems).skip(objectPagination.skipItems);
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

            break;
        case "inactive":
            await Product.updateMany(
                { _id: { $in: listIds } },
                { $set: { status: "inactive" } }
            )

            break;
    }


    res.redirect(req.get('Referrer') || '/admin/products')
}
