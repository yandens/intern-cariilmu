"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Courses", [
      {
        course_category_id: 1,
        title: "NodeJs for beginner-expert",
      },
      {
        course_category_id: 1,
        title: "ExpressJs as framework for NodeJs for beginner-expert",
      },
      {
        course_category_id: 2,
        title: "HTML, CSS, Javascript for beginner-expert",
      },
      {
        course_category_id: 2,
        title: "ReactJs for beginner-expert",
      },
      {
        course_category_id: 3,
        title: "ReactJs and ExpressJs for building website for beginner-expert",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Courses", null, {});
  },
};
