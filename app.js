const PORT = 3000;
const express = require ("express");
const { engine } = require("express-handlebars");
const mongooose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
const userRouter = require("./routes/userRoute")
const cookieParser = require("cookie-parser")
const getUser = require('./helper/cookie')
const app = express()

//Session
//24 horas em mili segundos
const oneDay = 1000 * 60 * 60 * 24

app.use(session({
    secret:"WebSiteGenerator12121212",
    resave: true,
    cookie: { maxAge: oneDay },
    saveUninitialized: true
}))

app.use(flash())
//Variaveis Globais
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

// Body Parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser())

// Handlebars
app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');
app.set('views', './views')

//Mongoose 
mongooose.connect("mongodb+srv://curso:curso@cluster0.mv0re.mongodb.net/WebSiteGenerator", (error) => {
    if(error){
        console.log(error)
    }else{
        console.log("Mongo connected")
    }
})

// Rotas

app.get("/", (req, res) => {
    res.redirect("/bem-vindo")
})

app.get("/bem-vindo", getUser.getCookie, (req, res) => {
    res.render("index")
})

app.get("/bemvindo", getUser.getCookie, (req, res) => {
    res.render("novoBemvindo")
})

app.use("/usuarios", getUser.getCookie ,userRouter )

app.listen(PORT, () => {
    console.log("Server Running on Port:", PORT)
})