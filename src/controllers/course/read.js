const { Course, CourseCategory } = require("../../models");
const response = require("../../utils/response");

const read = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return response(res, 400, false, "Parameter required!", null);

    const course = await Course.findOne({ where: { id } });
    if (!course) return response(res, 404, false, "Course not found!", null);

    return response(res, 200, true, "Success get data course!", { course });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

const readAll = async (req, res) => {
  try {
    const allCourse = await Course.findAll();

    return response(res, 200, true, "Success get courses data!", { allCourse });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = { read, readAll };
