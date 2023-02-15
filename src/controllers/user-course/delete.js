const { UserCourse } = require("../../models");
const response = require("../../utils/response");

const deleteUserCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return response(res, 400, false, "Parameter required!", null);

    const userCourse = await UserCourse.findOne({ where: { id } });
    if (!userCourse)
      return response(res, 404, false, "User course not found!", null);

    await userCourse.destroy();

    return response(res, 200, true, "User course deleted!", null);
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = deleteUserCourse;
