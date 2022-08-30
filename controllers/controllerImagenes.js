const modeloImagen = require('../models').Imagen

const request = require('request');

var fs = require('fs');
const mime = require('mime');

module.exports = class controllerImagenes {

    static async getImagenes(req,res){
        modeloImagen.findAll({
            
        })
        .then((data)=>{
            res.json({resultado:data})
        })
        .catch((error)=>{
            res.json({error:error})
        })
    
    }

    static async getImagenById(req,res){
        modeloImagen.findOne({
            where:{ id : req.params.id }
        })
        .then((data)=>{
            res.json({resultado:data})
        })
        .catch((error)=>{
            res.json({error:error})
        })
    }

    static async createImagen(req,res){
        console.log("req.body")
        console.log(req.body)

        console.log("req.file.filename")
        console.log(req.file.filename)

        var imagen = req.body;
        var imagename = req.file.filename;
        imagen.url = imagename;

        

        modeloImagen.create(imagen)
        .then((data)=>{
            res.json({resultado:data})
        })
        .catch((error)=>{
            res.json({error:error})
        })

    }


    static async createImagenBase64(req,res){
        console.log("req.body")
        //console.log(req.body)

        // console.log("req.file.filename")
        // console.log(req.file.filename)

        // var imagen = req.body;
        // var imagename = req.file.filename;
        // imagen.url = imagename;

        //console.log(req.body)
        var matches = req.body.image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        let extension = mime.extension(type);
        let fileName = "image" + Date.now() + ".jpg";
        try {
            fs.writeFileSync("./uploads/imgs/"+req.body.idClase+"/" + fileName, imageBuffer, 'utf8');
            

            let imagenNueva = {
                url: fileName,
                idClase: req.body.idClase
            }


            modeloImagen.create(imagenNueva)
            .then((data)=>{
                res.json({resultado:data})                 
            })
            .catch((error)=>{
                res.json({error:error})
                console.log("error fs")
                console.log(error)
            })
            
            
        } catch (e) {
            // next(e);
            console.log(e)
        }        

        

    }


    static async editImagen(req,res){
        modeloImagen.update(req.body,{
            where: { id: req.params.id }
        })
        .then((data)=>{
            res.json({resultado:data})
        })
        .catch((error)=>{
            res.json({error:error})
        })
    }

    static async deleteImagen(req,res){
        modeloImagen.findOne({
            where:{id:req.params.id}
        })
        .then((data)=>{
            fs.unlinkSync('./uploads/imgs/'+data.url)
            modeloImagen.destroy({
                where:{ id : req.params.id }
            })
            .then((data)=>{
                res.json({resultado:data})
            })
            .catch((error)=>{
                res.json({error:error})
            })
        })
        .catch((error)=>{
            res.json({error:error})
        })
        
    }

   
}