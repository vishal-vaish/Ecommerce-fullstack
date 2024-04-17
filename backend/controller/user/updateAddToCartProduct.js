const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
  try {
    const addToCartProductId = req.body._id;
    const qty = req.body.quantity;

    const updateProduct = await addToCartModel.updateOne({_id: addToCartProductId}, {
      ...(qty && {quantity: qty})
    });


    return res.json({
      data: updateProduct,
      message: "Product Updated",
      success: true,
      error: false
    })
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

module.exports = updateAddToCartProduct;
