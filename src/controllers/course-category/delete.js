const { CourseCategory } = require("../../models");
const response = require("../../utils/response");

const deleteCourseCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return response(res, 400, false, "Parameter required!", null);

    const category = await CourseCategory.findOne({ where: { id } });
    if (!category)
      return response(res, 404, false, "Course category not found!", null);

    await category.destroy();

    return response(res, 200, true, "Course category deleted!", null);
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = deleteCourseCategory;
