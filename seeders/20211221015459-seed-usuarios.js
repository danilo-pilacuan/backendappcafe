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
        nombre: 'Bryan Ulloa',
        correo: 'bryan.ulloa@utc.edu.ec',
        contrasenia: '$2a$10$fOvc8huxMNqQhgakYeTQL.L4H1YbzcL2dKgMFTyLOOns81kItt53a',
        tipoUsuario: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Administrador2',
        correo: 'Administrador2@utc.edu.ec',
        contrasenia: '$2a$10$fOvc8huxMNqQhgakYeTQL.L4H1YbzcL2dKgMFTyLOOns81kItt53a',
        tipoUsuario: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'usuario3',
        correo: 'usuario3@utc.edu.ec',
        contrasenia: '$2a$10$fOvc8huxMNqQhgakYeTQL.L4H1YbzcL2dKgMFTyLOOns81kItt53a',
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
