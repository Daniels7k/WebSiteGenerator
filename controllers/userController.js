//Modulos
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuario")

//Funções
//Registro
function registroGet (req, res) {
    res.render("usuario/registro")
}

function registroPost (req, res) {
    
    //Salvando no banco de dados
    const novoUsuario = new Usuario({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        email: req.body.email,
        profissao: req.body.profissao,
        linkedin: req.body.linkedin,
        github: req.body.linkedin,
        sobre: req.body.sobre,
        senha: req.body.senha
    }).save().then(() => {
        res.redirect("/")

    }).catch((error) => {
        console.log(error)
    })

}


module.exports = {registroGet, registroPost} 