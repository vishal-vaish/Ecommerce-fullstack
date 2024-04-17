const userModel = require("../../models/userModel");

async function updateUser(req, res) {
  try {
    const {userId, email, name, role} = req.body;

    const payload = {
      ...(email && {email: email}),
      ...(name && {name: name}),
      ...(role && {role: role}),
    };

    const updateUser = await userModel.findByIdAndUpdate(userId, payload, {new: true});

    if (!updateUser) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false
      });
    }

    res.json({
      data: updateUser,
      message: "User updated successfully",
      error: false,
      success: true
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

module.exports = updateUser;
