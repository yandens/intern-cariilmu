const { User } = require("../../models");
const bcrypt = require("bcrypt");
const response = require("../../utils/response");
const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });
    if (userExist)
      return response(res, 400, false, "Email already used!", null);

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    return response(res, 201, true, "User created!", {
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = create;
