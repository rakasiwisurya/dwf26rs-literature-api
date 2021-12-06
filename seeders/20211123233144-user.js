"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("users", {
      email: "admin@gmail.com",
      password: "$2a$10$/DAeUmDBtraAci5tg5Y.AOifekzKfkowhqn7WxBITLWUkP0OxSBxK", //12345
      fullname: "Admin",
      gender: "male",
      phone: "085717573808",
      address: "Jl. Kenangan No. 1",
      avatar: null,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("users", null, {});
  },
};
