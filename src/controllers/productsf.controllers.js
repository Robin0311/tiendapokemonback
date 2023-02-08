const { msgFormatConst, resApi, msjPError, msjP } = require("../helpers/helpers");
const Productsf = require('../models/productsfSchema')

const getProductsf = async(req, res) => {
  try {
    const Productsfs = await Productsf.find({})
    msgFormatConst("getProductsf");
    resApi(res, 'success', Productsfs)
    } catch {
    msjPError("Error en la consulta");
    }
};

const createProductsf = async(req, res) => {
  const ProductsfNew = await Productsf.create(req.body)
  res.json(ProductsfNew)
  msgFormatConst("createProductsf");
};

const updateProductsf = async(req, res) => {
    try {
      const resp = await Productsf.findByIdAndUpdate(req.params.id, req.body, {
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

  const deleteProductsf = async(req, res) => {
    try {
      msjP("Delete product");
      const product = await Productsf.findByIdAndDelete(req.params.id);
      resApi(res, "success", productsf);
    } catch {
      msjPError("Error Delete Product");
    }
  };

module.exports = {
    getProductsf,
  createProductsf,
  updateProductsf,
  deleteProductsf
};
