const { User } = require("../../models");
const response = require("../../utils/response");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return response(res, 400, false, "Parameter required!", null);

    const user = await User.findOne({ where: { id } });
    if (!user) return response(res, 404, false, "User not found!", null);

    await user.destroy();

    return response(res, 200, true, "User deleted!", null);
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = deleteUser;
