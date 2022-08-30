const express=require('express')
const app=express()
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3125','http://localhost:8080','http://localhost:4200','http://localhost:8082',"http://192.168.100.100"]
}))
app.use(cookieParser())
//app.use(morgan('dev'))

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({extended: true,limit: '25mb'}));

app.use(express.static("uploads/imgs"))
app.use(express.static("uploads/docs"))


app.get('/',(req,res)=>{
    res.send("Hola Mundo")
})


app.use('/api/usuarios',require('./routes/routesUsuarios'))
app.use('/api/imagenes',require('./routes/routesImagenes'))
app.use('/api/clases',require('./routes/routesClases'))

app.listen(3125,()=>{
    console.log('Server UP running at: localhost:3125')
})