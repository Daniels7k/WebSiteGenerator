const PORT = 3000;
const express = require ("express");
const { engine } = require("express-handlebars");
const mongooose = require("mongoose")
const userRouter = require("./routes/userRoute")
const app = express()


// Body Parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

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

app.get("/bem-vindo", (req, res) => {
    res.render("index")
})

app.use("/usuarios", userRouter )

app.listen(PORT, () => {
    console.log("Server Running on Port:", PORT)
})