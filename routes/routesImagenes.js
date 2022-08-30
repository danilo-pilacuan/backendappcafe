const express = require("express");
const router = express.Router();
const controllerImagenes = require('../controllers/controllerImagenes')
const multer = require("multer")

let storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads/imgs');
        console.log("dest ok")
    },
    filename: function(req,file,cb){
        console.log("filename ok")
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
});

let upload = multer({
    storage: storage,
}).single("image");

router.get("/",controllerImagenes.getImagenes);

router.get("/:id",controllerImagenes.getImagenById);
//router.post("/",upload,controllerImagenes.createImagen);
router.post("/",controllerImagenes.createImagenBase64);
router.patch("/:id",controllerImagenes.editImagen);
router.delete("/:id",controllerImagenes.deleteImagen);

module.exports = router;

