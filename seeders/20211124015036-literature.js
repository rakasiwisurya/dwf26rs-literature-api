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

    await queryInterface.bulkInsert("literature", [
      {
        title: "Sistem Informasi Standard BAN-PT",
        userId: 2,
        publication_date: "2020-04-04",
        pages: 436,
        isbn: "9781789807554",
        author: "Rakasiwi Surya",
        attache: "si-standard-ban-pt.pdf",
        status: "Waiting Approve",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("literatures", null, {});
  },
};
