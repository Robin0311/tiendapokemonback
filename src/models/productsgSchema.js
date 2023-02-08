const mongoose =  require ('mongoose')
const productsgSchema = mongoose.Schema(
    {
        name: { type: String, require: true},
        type: { type: String, require: true},
        price: { type: Number, require: true},
        description: { type: String, require: true},
        photo: {type: String, require: true}
    }
)
const Productsg = mongoose.model('productsg', productsgSchema)
module.exports = Productsg