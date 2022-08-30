const express = require("express");
const router = express.Router();
const controllerClases = require('../controllers/controllerClases')
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

router.get("/",controllerClases.getClases);

router.get("/:id",controllerClases.getClaseById);
router.post("/",controllerClases.createClase);
router.patch("/:id",controllerClases.editClase);
router.delete("/:id",controllerClases.deleteClase);

module.exports = router;

