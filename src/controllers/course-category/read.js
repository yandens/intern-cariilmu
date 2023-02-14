const { Course, CourseCategory } = require("../../models");
const response = require("../../utils/response");

const read = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return response(res, 400, false, "Parameter required!", null);

    const category = await CourseCategory.findOne({
      where: { id },
      include: [
        {
          model: Course,
          as: "course",
        },
      ],
    });
    if (!category)
      return response(res, 404, false, "Course category not found!", null);

    return response(res, 200, true, "Success get data course category!", {
      category,
    });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

const readAll = async (req, res) => {
  try {
    const allCategory = await CourseCategory.findAll();

    return response(res, 200, true, "Success get course categories data!", {
      allCategory,
    });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = { read, readAll };
