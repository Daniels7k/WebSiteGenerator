const PORT = 3000;
const express = require ("express");
const handlebars = require("express-handlebars")
const siteRoute = require("./routes/siteRoute")
const app = express()


// Body Parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Template Engine
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Rotas

app.use(express.static(__dirname + '/public'));

app.use("/", siteRoute)

app.listen(PORT, () => {
    console.log("Server Running on Port:", PORT)
})