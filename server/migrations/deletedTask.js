'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', 'deleted', {
        type: Sequelize.BOOLEAN,
      allowNull: true, 
      allowNull: false,
        defaultValue: false,
        field: "deleted"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tasks', 'deleted');
  }
};

