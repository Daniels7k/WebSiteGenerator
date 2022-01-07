const PORT = 3000;
const express = require ("express");
const path = require("path/posix");
const handlebars = require("express-handlebars")

const app = express ()

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

app.post("/your-site", (req, res) => {
    let data = {
        nome: req.body.nome,
        profissao: req.body.profissao,
        sobre: req.body.about,
        image: req.body.image,
        telefone: req.body.telefone,
        email: req.body.email,
        github: req.body.github,
        linkedin: req.body.linkedin,
    }

    console.log(data)

    res.render("template_blue", {data})
})

app.listen(PORT, () => {
    console.log("Server Running on Port:", PORT)
})