const { msgFormatConst, resApi, msjPError, msjP } = require("../helpers/helpers");
const Productsg = require('../models/productsgSchema')

const getProductsg = async(req, res) => {
  try {
    const Productsgs = await Productsg.find({})
    msgFormatConst("getProductsg");
    resApi(res, 'success', Productsgs)
    } catch {
    msjPError("Error en la consulta");
    }
};

const createProductsg = async(req, res) => {
  const ProductsgNew = await Productsg.create(req.body)
  res.json(ProductsgNew)
  msgFormatConst("createProductsg");
};

const updateProductsg = async(req, res) => {
    try {
      const resp = await Productsg.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      
        return res.json({
          message: 'Product updated successfully',
          detail: resp
        })
        
    } catch (e) {
      return res.json({
        message: 'Error',
        detail: e
      })
    }
  };

  const deleteProductsg = async(req, res) => {
    try {
      msjP("Delete product");
      const productsg = await Productsg.findByIdAndDelete(req.params.id);
      resApi(res, "success", productsg);
    } catch {
      msjPError("Error Delete Product");
    }
  };

module.exports = {
    getProductsg,
  createProductsg,
  updateProductsg,
  deleteProductsg
};
