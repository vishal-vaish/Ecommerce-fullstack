const addToCartModel = require("../../models/cartProduct");

const addToCartController = async(req,res)=>{
  try {
    const { productId } =req?.body;
    const currentUser = req.userId;

    const isProductAvailable = await addToCartModel.findOne({ productId })

    if(isProductAvailable) {
      return res.json({
            message: "Already exists in Add to Cart",
            success: true,
            error: false
          })
    }

    const payload ={
      productId: productId,
      quantity: 1,
      userId: currentUser
    }

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({
      message: "Product Added in Cart",
      data: saveProduct,
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

module.exports = addToCartController;
