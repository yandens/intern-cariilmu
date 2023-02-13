"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.CourseCategory, {
        foreignKey: "course_category_id",
        as: "category",
      });

      Course.hasMany(models.UserCourse, {
        foreignKey: "course_id",
        as: "userCourse",
      });
    }
  }

  Course.init(
    {
      course_category_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
