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
    await queryInterface.bulkInsert("CourseCategories", [
      {
        name: "Back End",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Front End",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Full Stack",
        createdAt: new Date(),
        updatedAt: new Date(),
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
    await queryInterface.bulkDelete("CourseCategories", null, {});
  },
};
