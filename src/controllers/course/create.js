const { Course, CourseCategory } = require("../../models");
const response = require("../../utils/response");

const create = async (req, res) => {
  try {
    const { title, courseCategory } = req.body;

    const category = await CourseCategory.findOne({
      where: { name: courseCategory },
    });
    if (!category)
      return response(res, 404, false, "Course category not found!", null);

    const courseExist = await Course.findOne({
      where: { title, course_category_id: category.id },
    });
    if (courseExist)
      return response(res, 400, false, "Course already exist!", null);

    const course = await Course.create({
      course_category_id: category.id,
      title,
    });

    return response(res, 201, true, "Course created!", {
      id: course.id,
      title: course.title,
      category: category.name,
    });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = create;
