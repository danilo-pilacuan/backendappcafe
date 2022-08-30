const modeloClase = require('../models').Clase

const request = require('request');

var fs = require('fs');
const mime = require('mime');

module.exports = class controllerClases {

    static async getClases(req,res){
        modeloClase.findAll({
            
        })
        .then((data)=>{
            res.json({resultado:data})
        })
        .catch((error)=>{
            res.json({error:error})
        })
    
    }

    static async getClaseById(req,res){
        modeloClase.findOne({
            where:{ id : req.params.id }
        })
        .then((data)=>{
            res.json({resultado:data})
        })
        .catch((error)=>{
            res.json({error:error})
        })
    }


    static async createClase(req,res){
        //console.log("req.body")
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
        let fileName = req.body.descripcionClase + ".jpg";
        try {
            fs.writeFileSync("./uploads/imgs/imgsClases/" + fileName, imageBuffer, 'utf8');
            

            let claseNueva = {
                idClase:0,
                descripcionClase:req.body.descripcionClase,
                urlImg: "/imgsClases/"+fileName,
            }


            modeloClase.create(claseNueva)
            .then((data)=>{
                let dir="./uploads/imgs/"+data.id.toString()
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }

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


    static async editClase(req,res){
        modeloClase.update(req.body,{
            where: { id: req.params.id }
        })
        .then((data)=>{
            res.json({resultado:data})
        })
        .catch((error)=>{
            res.json({error:error})
        })
    }

    static async deleteClase(req,res){
        modeloClase.findOne({
            where:{id:req.params.id}
        })
        .then((data)=>{
            fs.unlinkSync('./uploads/imgs/'+data.url)
            modeloClase.destroy({
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