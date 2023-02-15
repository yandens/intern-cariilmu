const { User } = require("../../models");
const bcrypt = require("bcrypt");
const response = require("../../utils/response");

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { newName, newEmail, newPassword } = req.body;

    if (!id) return response(res, 400, false, "Parameter required!", null);

    const user = await User.findOne({ where: { id } });
    if (!user) return response(res, 404, false, "User not found!", null);

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({
      name: newName,
      email: newEmail,
      password: encryptedPassword,
    });

    return response(res, 200, true, "User updated!", {
      id: user.id,
      name: newName,
      email: newEmail,
    });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = update;
