const Product = require('../../models/product-model');

module.exports = {
    index: async (req,res)=>{

        const listProducts = await Product.find({
            deleted: false,
            status: 'active'
        });
        
        const newListProducts = listProducts.map( (item) =>{
            
                item.newPrice = (item.price - item.price * (item.discountPercentage/100)).toFixed(2)
                return item;
        })


        res.render('client/pages/products/index.pug',{
            pageTitle: 'Product Page',
            content: "Products page",
            products: newListProducts
        })
    }
}