const { Admin } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../../utils/response");
const { JWT_SECRET_KEY } = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin)
      return response(
        res,
        404,
        false,
        "These credentials not match with our record"
      );

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return response(
        res,
        404,
        false,
        "These credentials not match with our record"
      );

    const payload = { id: admin.id, name: admin.name, email: admin.email };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });

    return response(res, 200, true, "Login success!", {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      token,
    });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = login;
