const mongoose =  require ('mongoose')
const productstSchema = mongoose.Schema(
    {
        name: { type: String, require: true},
        type: { type: String, require: true},
        price: { type: Number, require: true},
        description: { type: String, require: true},
        photoimage: {type: String, require: true},
        quantity: { type: Number, require: true}
    }
)
const Productst = mongoose.model('productst', productstSchema)
module.exports = Productst