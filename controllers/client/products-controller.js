module.exports = {
    index: (req,res)=>{
        res.render('client/pages/products/index.pug',{
            pageTitle: 'Product Page',
            content: "Products page"
        })
    }
}