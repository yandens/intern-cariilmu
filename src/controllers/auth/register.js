const { Admin } = require("../../models");
const bcrypt = require("bcrypt");
const response = require("../../utils/response");

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return response(res, 400, false, "Password doesn't match", null);

    const adminExist = await Admin.findOne({ where: { email } });
    if (adminExist) return response(400, false, "Email is already used!", null);

    const encryptedPassword = await bcrypt.hash(password, 10);
    await Admin.create({ name, email, password: encryptedPassword });

    return response(res, 201, true, "Register success!", null);
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = register;
