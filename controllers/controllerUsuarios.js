const modeloCaracteristicaEquipo = require('../models').CaracteristicaEquipo
const modeloDepartamento = require('../models').Departamento
const modeloEquipo = require('../models').Equipo
const modeloEstadoEquipo = require('../models').EstadoEquipo
const modeloFichaMantenimiento = require('../models').FichaMantenimiento
const modeloFuncionario = require('../models').Funcionario
const modeloImagen = require('../models').Imagen
const modeloInventario = require('../models').Inventario
const modeloMetrica = require('../models').Metrica
const modeloTipoCaracteristicaEquipo = require('../models').TipoCaracteristicaEquipo
const modeloTipoEquipo = require('../models').TipoEquipo
const modeloUsuario = require('../models').Usuario

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');


module.exports = class controllerUsuarios {

    static async getUsuarios(req,res){
        modeloUsuario.findAll({
            
        })
        .then((data)=>{
            res.json({resultado:data})
        })
        .catch((error)=>{
            res.json({error:error})
        })
    
    }

    static async getUsuarioById(req,res){
        modeloUsuario.findOne({
            where:{ id : req.params.id }
        })
        .then((data)=>{
            res.json({resultado:data})
        })
        .catch((error)=>{
            res.json({error:error})
        })
    }

    static async createUsuario(req,res){
        var usuario = req.body;
        if(!usuario.hasOwnProperty('contrasenia'))
        {
            var generator = require('generate-password');
            var password = generator.generate({
                length: 10,
                numbers: true
            });
            usuario['contrasenia']=password;
            console.log(password)
        }
        if(usuario.contrasenia=="")
        {
            var generator = require('generate-password');
            var password = generator.generate({
                length: 10,
                numbers: true
            });
            usuario['contrasenia']=password;
            console.log(password)
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(usuario['contrasenia'],salt);

        usuario['contrasenia']=hashedPassword;

        modeloUsuario.create(usuario)
        .then((data)=>{
            res.json({resultado:data})
        })
        .catch((error)=>{
            res.json({error:error})
        })
    }

    static async editUsuario(req,res){
        

        let usuario = await modeloUsuario.findOne({
            where:{ id:req.params.id}
        })

        if(usuario){
            console.log("usuario------")
            console.log(usuario)
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.contrasenia,salt);

            let usuarioEdit={
                id:req.params.id,
                nombre:req.body.nombre,
                correo:req.body.correo,
                contrasenia:hashedPassword,
                tipoUsuario:req.body.tipoUsuario
            }           

            modeloUsuario.update(usuarioEdit,{
                where: { id: req.params.id }
            })
            .then((data)=>{
                res.json({resultado:data})
            })
            .catch((error)=>{
                res.json({error:error})
            })
        }
        else{
            return res.status(404).send({message: "User not found"});
        }

        
    }
    static async cambiarContrasenia(req,res){
        console.log(req.body)

        let usuarioCambiar = await modeloUsuario.findOne({
            where:{ id:req.params.id}
        })

        if(usuarioCambiar)
        {

            console.log("encontrado")
            console.log(usuarioCambiar.dataValues)

            console.log("formpass: "+req.body.contrasenia)
            console.log("userpass: "+usuarioCambiar.contrasenia)

            if(await bcrypt.compare(req.body.contrasenia,usuarioCambiar.contrasenia)){
                console.log("Passwords match")
                //return res.status(400).send({message: "invalid credentials"});
                usuarioCambiar.contrasenia=req.body.contraseniaNueva


                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.contraseniaNueva,salt);

                let usuarioEdit={
                    id:usuarioCambiar.id,
                    nombre:usuarioCambiar.nombre,
                    correo:usuarioCambiar.correo,
                    contrasenia:hashedPassword,
                    tipoUsuario:usuarioCambiar.tipoUsuario
                }           

                modeloUsuario.update(usuarioEdit,{
                    where: { id: req.params.id }
                })
                .then((data)=>{
                    res.json({resultado:data})
                })
                .catch((error)=>{
                    res.status(400).json({error:error})
                })

            }
            else
            {
                console.log("Passwords don't match")
                res.status(400).json({error:"error"})
                // const token = jwt.sign({_id: data.id}, "secret") //colocar secret en archivo .env
                // res.cookie('jwt',token,{
                //     httpOnly: true,
                //     maxAge: 24*60*60*1000 //1 dia
                // })
                // res.status(200).send({message: "success"});
            }
            //res.json({resultado:data})
            
        }

        // console.log(req.body)
        // modeloUsuario.findOne({
        //     where:{ id:req.params.id}
        // })
        // .then((data)=>{
            
            
        //     // if(!await bcrypt.compare(req.body.password,data.password)){
        //     //     return res.status(400).send({message: "invalid credentials"});
        //     // }
        //     // else
        //     // {
        //     //     const token = jwt.sign({_id: data.id}, "secret") //colocar secret en archivo .env
        //     //     res.cookie('jwt',token,{
        //     //         httpOnly: true,
        //     //         maxAge: 24*60*60*1000 //1 dia
        //     //     })
        //     //     res.status(200).send({message: "success"});
        //     // }
        //     //res.json({resultado:data})
        //     //console.log("formpass: "+req.body.contrasenia)
        //     //console.log("userpass: "+data.contrasenia)

        //     if(req.body.contrasenia==data.contrasenia)
        //     {
        //         modeloUsuario.update({contrasenia:req.body.contraseniaNueva},{
        //             where: { id: req.params.id }
        //         })
        //         .then((data)=>{
                    
        //             res.status(200).send({resultado: "success"});
        //         })
        //         .catch((error)=>{
        //             res.json({error:error})
        //         })
        //     }
        //     else
        //     {
        //         return res.status(400).send({error: "No match"});
        //     }
        // })
        // .catch((error)=>{
        //     return res.status(404).send({error: "User not found"});
        //     //res.json({error:error})
        // })

    }

    static async recoverUserByEmail(req,res)
    {
        let userFound =await modeloUsuario.findOne({
            where:{ correo:req.body.correo}
        });

        if(userFound)
            {
                console.log("---------------userFound")
                console.log(userFound)
                console.log("----------------------------")
                var generator = require('generate-password');
                var newPassword = generator.generate({
                    length: 10,
                    numbers: true
                });


                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword,salt);

                const updatedUser=await modeloUsuario.update({contrasenia:hashedPassword},{
                    where:{ correo:req.body.correo}
                })

                if(updatedUser)
                {
                    var transporter = nodemailer.createTransport({
                        service: 'outlook',
                        auth: {
                        user: 'appcafeutc@outlook.com',
                        pass: '4ppC4feu/c'
                        }
                    });

                    var mailOptions = {
                        from: 'appcafeutc@outlook.com',
                        to: userFound.correo,
                        subject: 'Cambio de Contraseña APP CAFE',
                        html: `<h1>Recuperación de contraseña de la aplicacion</h1>
                        <br>
                        <p><strong>Contraseña nueva: </strong>`+newPassword+`</p><br>
                        <p>Realizar cambio de contraseña al ingresar al sistema en la opción perfil</p>`
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        res.json({error:"error"})
                        } else {
                        console.log('Email sent: ' + info.response);
                        res.json({resultado:"ok"})
                        }
                    });
                }
                else
                {
                    res.json({error:"error"})
                }
            }
            else
            {
                res.json({error:"error"})
            }        
    }

    static async recoverUser(req,res)
    {
        let userFound =await modeloUsuario.findOne({
            where:{ id:req.params.id}
        });

        if(userFound)
            {
                console.log("---------------userFound")
                console.log(userFound)
                console.log("----------------------------")
                var generator = require('generate-password');
                var newPassword = generator.generate({
                    length: 10,
                    numbers: true
                });


                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword,salt);

                const updatedUser=await modeloUsuario.update({contrasenia:hashedPassword},{
                    where: { id: req.params.id }
                })

                if(updatedUser)
                {
                    var transporter = nodemailer.createTransport({
                        service: 'outlook',
                        auth: {
                        user: 'appcafeutc@outlook.com',
                        pass: '4ppC4feu/c'
                        }
                    });

                    var mailOptions = {
                        from: 'appcafeutc@outlook.com',
                        to: userFound.correo,
                        subject: 'Cambio de Contraseña APP CAFE',
                        html: `<h1>Recuperación de contraseña de la aplicacion</h1>
                        <br>
                        <p><strong>Contraseña nueva: </strong>`+newPassword+`</p><br>
                        <p>Realizar cambio de contraseña al ingresar al sistema en la opción perfil</p>`
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        res.json({error:"error"})
                        } else {
                        console.log('Email sent: ' + info.response);
                        res.json({resultado:"ok"})
                        }
                    });

                    // if(resultadoEnviar)
                    // {
                        
                    // }
                    // else
                    // {
                    //     console.log(error)
                        
                    // }

                }
                else
                {
                    res.json({error:"error"})
                }

                // modeloUsuario.update({contrasenia:hashedPassword},{
                //     where: { id: req.params.id }
                // })
                // .then((data)=>{
                    
                
                    

                //     res.json({resultado:data})

                // })
                // .catch((error)=>{
                    
                // })
            }
            else
            {
                res.json({error:"error"})
            }
   

        
    }

    static async deleteUsuario(req,res){
        modeloUsuario.destroy({
            where:{ id : req.params.id }
        })
        .then((data)=>{
            res.json({resultado:data})
        })
        .catch((error)=>{
            res.json({error:error})
        })
    }


    static async login(req,res){
        
        console.log("----------------------------------- user login ----------------------")
        console.log(req.body)
        const usuario = await modeloUsuario.findOne({
            where:{ correo:req.body.correo}
        })

        if(!usuario){
            return res.status(404).send({message: "User not found"});
        }
        else{
            console.log("usuario")
            console.log(usuario)

            console.log("formpass: "+req.body.contrasenia)
            console.log("userpass: "+usuario.contrasenia)

            if(!await bcrypt.compare(req.body.contrasenia,usuario.contrasenia)){
                return res.status(400).send({error: "invalid credentials"});
                
            }
            else
            {
                const token = jwt.sign({id: usuario.id}, "secret") //colocar secret en archivo .env
                res.cookie('jwt',token,{
                    httpOnly: true,
                    maxAge: 24*60*60*1000 //1 dia
                })
                res.status(200).send({resultado: usuario});
            }
        }
        
    }


    static async authLogin(req,res){
        try{
            const cookie = req.cookies['jwt'];
            const claims = jwt.verify(cookie,"secret"); //desencriptar jwt con la clave entre comillas, debe estar en el .env
            if(!claims){
                return res.status(401).send({ error: "unauthenticated"});
            }
            else
            {
                ////////////////////////////////////

                modeloUsuario.findOne({
                    where:{ id:claims.id}
                })
                .then((data)=>{
                    const {password,...userData} = data.toJSON();
                    res.json({resultado:userData})
                })
                .catch((error)=>{
                    return res.status(404).send({error: "User not found"});
                    //res.json({error:error})
                })

                ////////////////////////////////////

                // const user = await User.findOne({ _id : claims._id});
                // const {password, ...data} = user.toJSON()
                // res.send(data);
            }
        }catch(e)
        {
            return res.status(401).send({resultado:"unauthenticated"});
        }
        
    }
    //logout
    static async logout(req,res){
        res.cookie('jwt','',{maxAge:0});
        res.status(200).send({resultado: "success"})
    }

   
}