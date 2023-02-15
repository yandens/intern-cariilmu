const { Course, User, UserCourse } = require("../../models");
const response = require("../../utils/response");

const create = async (req, res) => {
  try {
    const { userName, courseTitle } = req.body;

    const user = await User.findOne({ where: { name: userName } });
    if (!user) return response(res, 404, false, "User not found!", null);

    const course = await Course.findOne({ where: { title: courseTitle } });
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

    const userCourse = await UserCourse.create({
      user_id: user.id,
      course_id: course.id,
    });

    return response(res, 201, true, "User course created!", {
      id: userCourse.id,
      user: user.name,
      course: course.title,
    });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = create;
