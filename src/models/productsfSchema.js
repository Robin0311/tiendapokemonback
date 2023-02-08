const mongoose =  require ('mongoose')
const productsfSchema = mongoose.Schema(
    {
        name: { type: String, require: true},
        type: { type: String, require: true},
        price: { type: Number, require: true},
        description: { type: String, require: true},
        photo: {type: String, require: true}
    }
)
const Productsf = mongoose.model('productsf', productsfSchema)
module.exports = Productsf