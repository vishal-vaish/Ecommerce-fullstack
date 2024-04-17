const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProduct = async(req,res)=>{
  try {
    const addToCartProductId = req.body._id;

    const deleteProduct = await addToCartModel.deleteOne({ _id : addToCartProductId})


    return res.json({
      data: deleteProduct,
      message : "Product Deleted From Cart",
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

module.exports = deleteAddToCartProduct;
