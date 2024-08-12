'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tasks', [
      {
        title: 'Task 1',
        description: 'This is the first task',
        status: 'pending',
        userId: 1, // تأكد من أن هذه القيمة تتوافق مع id المستخدم في قاعدة البيانات
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Task 2',
        description: 'This is the second task',
        status: 'completed',
        userId: 2, // تأكد من أن هذه القيمة تتوافق مع id المستخدم في قاعدة البيانات
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
