const { Course } = require("../../models");
const response = require("../../utils/response");

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return response(res, 400, false, "Parameter required!", null);

    const course = await Course.findOne({ where: { id } });
    if (!course) return response(res, 404, false, "Course not found!", null);

    await course.destroy();

    return response(res, 200, true, "Course deleted!", null);
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = deleteCourse;
