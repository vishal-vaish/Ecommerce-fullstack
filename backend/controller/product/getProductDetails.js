const productModel = require("../../models/productModel");

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);

    res.json({
      data: product,
      message: "Ok",
      error: false,
      success: true
    })
  } catch (error) {
    res.json({
      message: error.message || error,
      error: false,
      success: true
    })
  }
}

module.exports = getProductDetails;
