const { User } = require("../../models");
const bcrypt = require("bcrypt");
const response = require("../../utils/response");

const update = async (req, res) => {
  try {
    const { email } = req.params;
    const { newName, newEmail, newPassword } = req.body;

    if (!email) return response(res, 400, false, "Parameter required!", null);

    const user = await User.findOne({ where: { email } });
    if (!user) return response(res, 404, false, "User not found!", null);

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    await User.update(
      { name: newName, email: newEmail, password: encryptedPassword },
      { where: { email } }
    );

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
