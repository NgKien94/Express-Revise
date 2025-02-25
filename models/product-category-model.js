const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const productCategorySchema = mongoose.Schema({
    title: String,
    description: String,
    parent_id: {
        type:String,
        default: ""
    },
    thumbnail: String,
    position: Number,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    deletedAt: Date
}, {
    timestamps: true
})


const ProductCategory = mongoose.model('ProductCategory', productCategorySchema, "products-category");
module.exports = ProductCategory;
