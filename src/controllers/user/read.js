const { User, UserCourse } = require("../../models");
const response = require("../../utils/response");

const read = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return response(res, 400, false, "Parameter required!", null);

    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: UserCourse,
          as: "userCourse",
        },
      ],
    });
    if (!user) return response(res, 404, false, "User not found!", null);

    return response(res, 200, true, "Success get user data!", { user });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

const readAll = async (req, res) => {
  try {
    const allUser = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    return response(res, 200, true, "Success get users data!", { allUser });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = { read, readAll };
