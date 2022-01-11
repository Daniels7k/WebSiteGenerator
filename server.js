const PORT = 3000;
const express = require ("express");
const handlebars = require("express-handlebars")

const upload = multer({storage})

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
        sobre: req.body.sobre,
        email: req.body.email,
        linkedin: req.body.linkedin,
    }

    console.log(data)

    res.render("template_site", {data})
})

app.listen(PORT, () => {
    console.log("Server Running on Port:", PORT)
})