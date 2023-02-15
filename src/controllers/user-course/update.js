const { Course, User, UserCourse } = require("../../models");
const response = require("../../utils/response");

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { newUserName, newCourseTitle } = req.body;

    if (!id) return response(res, 400, false, "Parameter required!", null);

    const userCourse = await UserCourse.findOne({ where: { id } });
    if (!userCourse)
      return response(res, 404, false, "User course not found!", null);

    const user = await User.findOne({ where: { name: newUserName } });
    if (!user) return response(res, 404, false, "User not found!", null);

    const course = await Course.findOne({ where: { title: newCourseTitle } });
    if (!course) return response(res, 404, false, "Course not found!", null);

    const userCourseExist = await UserCourse.findOne({
      where: { user_id: user.id, course_id: course.id },
    });
    if (userCourseExist)
      return response(
        res,
        400,
        false,
        "User already register in this course!",
        null
      );

    await userCourse.update({ user_id: user.id, course_id: course.id });

    return response(res, 200, true, "User course updated!", {
      id: userCourse.id,
      user: user.name,
      course: course.title,
    });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = update;
