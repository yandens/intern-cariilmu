const { Course, CourseCategory } = require("../../models");
const response = require("../../utils/response");

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, courseCategory } = req.body;

    if (!id) return response(res, 400, false, "Parameter required!", null);

    const course = await Course.findOne({ where: { id } });
    if (!course) return response(res, 404, false, "Course not found!", null);

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

    await course.update({ title, course_category_id: category.id });

    return response(res, 200, true, "Course updated!", {
      title,
      category: category.name,
    });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = update;
