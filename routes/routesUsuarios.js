const express = require("express");
const router = express.Router();
const controllerUsuarios = require('../controllers/controllerUsuarios')


router.get("/",controllerUsuarios.getUsuarios);
router.get("/logout",controllerUsuarios.logout);
router.get("/:id",controllerUsuarios.getUsuarioById);
router.post("/",controllerUsuarios.createUsuario);
router.patch("/:id",controllerUsuarios.editUsuario);
router.patch("/cambiarContrasenia/:id",controllerUsuarios.cambiarContrasenia);
router.delete("/:id",controllerUsuarios.deleteUsuario);
router.post("/login",controllerUsuarios.login);
router.post("/authLogin",controllerUsuarios.authLogin);


module.exports = router;

