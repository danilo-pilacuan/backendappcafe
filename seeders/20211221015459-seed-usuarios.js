'use strict';

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
     return queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Administrador',
        correo: 'admin@utc.edu.ec',
        contrasenia: '123456',
        tipoUsuario: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Administrador2',
        correo: 'Administrador2@utc.edu.ec',
        contrasenia: '123456',
        tipoUsuario: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Administrador3',
        correo: 'Administrador3@utc.edu.ec',
        contrasenia: '123456',
        tipoUsuario: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ]);

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
