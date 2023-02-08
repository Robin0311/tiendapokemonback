const { msgFormatConst, resApi, msjPError, msjP } = require("../helpers/helpers");
const Productst = require('../models/productstSchema')

const getProductst = async(req, res) => {
  try {
    const Productsts = await Productst.find({})
    msgFormatConst("getProductst");
    resApi(res, 'success', Productsts)
    } catch {
    msjPError("Error en la consulta");
    }
};

const createProductst = async(req, res) => {
  const ProductstNew = await Productst.create(req.body)
  res.json(ProductstNew)
  msgFormatConst("createProductst");
};

const updateProductst = async(req, res) => {
    try {
      const resp = await Productst.findByIdAndUpdate(req.params.id, req.body, {
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

  const deleteProductst = async(req, res) => {
    try {
      msjP("Delete product");
      const productst = await Productst.findByIdAndDelete(req.params.id);
      resApi(res, "success", productst);
    } catch {
      msjPError("Error Delete Product");
    }
  };

module.exports = {
    getProductst,
  createProductst,
  updateProductst,
  deleteProductst
};
