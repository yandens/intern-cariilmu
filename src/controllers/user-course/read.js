const { Course, CourseCategory, User, UserCourse } = require("../../models");
const response = require("../../utils/response");

const readUserWithCourse = async (req, res) => {
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
          include: [
            {
              model: Course,
              as: "course",
              include: [
                {
                  model: CourseCategory,
                  as: "category",
                },
              ],
            },
          ],
        },
      ],
    });
    if (!user) return response(res, 404, false, "User not found!", null);

    return response(res, 200, true, "Success get user course data!", { user });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

const readCourseWithUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return response(res, 400, false, "Parameter required!", null);

    const course = await Course.findOne({
      where: { id },
      include: [
        {
          model: CourseCategory,
          as: "category",
        },
        {
          model: UserCourse,
          as: "userCourse",
          include: [
            {
              model: User,
              as: "user",
              attributes: { exclude: ["password"] },
            },
          ],
        },
      ],
    });
    if (!course) return response(res, 404, false, "Course not found!", null);
    return response(res, 200, true, "Success get course data!", { course });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = { readUserWithCourse, readCourseWithUser };
