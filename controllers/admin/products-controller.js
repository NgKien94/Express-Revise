const Product = require('../../models/product-model')
const filterHelpers = require('../../helpers/filterStatus');
const searchHelpers = require('../../helpers/search')


module.exports = {
    index: async (req,res) =>{
        

        let findObject = {
            deleted: false,
            
        }

        
        //Filter
        const filterStatus = filterHelpers(req.query); // cập nhật bộ lọc trả lại cho giao diện
        if(req.query.status){
            findObject.status = req.query.status;
        }

        // End filter


        //Search
        const objectSearch = searchHelpers(req.query);
        if(objectSearch.regex){
            findObject.title = objectSearch.regex;
        }
        //End Search


        const listProduct = await Product.find(findObject)
        

        res.render('admin/pages/products/index.pug',{
            pageTitle: 'Product Admin',
            products: listProduct,
            listFilter: filterStatus,
            keyword: objectSearch.keyword
        })
    }
}