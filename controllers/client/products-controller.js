const Product = require('../../models/product-model');

module.exports.index = async (req, res) => {

    const listProducts = await Product
        .find({
            deleted: false,
            status: 'active'
        })
        .sort({ position: "desc" })

    const newListProducts = listProducts.map((item) => {

        item.newPrice = (item.price - item.price * (item.discountPercentage / 100)).toFixed(2)
        return item;
    })


    res.render('client/pages/products/index.pug', {
        pageTitle: 'Product Page',
        content: "Products page",
        products: newListProducts
    })
}

module.exports.detail = async (req, res) => {
    try {
        const slug = req.params.slug

        let findObject = {
            slug: slug,
            deleted: false,
            status: "active"
        }

        const product = await Product.findOne(findObject);


        res.render('client/pages/products/detail', {
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        console.log(error)
        res.redirect('/products')
    }
}