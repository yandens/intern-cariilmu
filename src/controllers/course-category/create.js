const { CourseCategory } = require("../../models");
const response = require("../../utils/response");

const create = async (req, res) => {
  try {
    const { courseCategory } = req.body;

    const categoryExist = await CourseCategory.findOne({
      where: { name: courseCategory },
    });
    if (categoryExist)
      return response(res, 400, false, "Course category already exist!", null);

    const category = await CourseCategory.create({ name: courseCategory });

    return response(res, 201, true, "Course category created!", {
      id: category.id,
      name: category.name,
    });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = create;
