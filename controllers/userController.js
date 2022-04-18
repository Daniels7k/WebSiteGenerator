//Modulos
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuario")

//Funções
//Registro
function registroGet(req, res) {
    res.render("usuario/registro")
}

function registroPost(req, res) {
    //Verificando preexistência de email
    Usuario.findOne({ email: req.body.email }).then((verifiedEmail) => {
        if (verifiedEmail) {
            req.flash("error_msg", "Este email já existe, tente outro!")
            res.redirect("/usuarios/registro")

        } else {
            //Salvando no banco de dados
            const novoUsuario = new Usuario({
                nome: req.body.nome,
                email: req.body.email,
                profissao: req.body.profissao,
                linkedin: req.body.linkedin,
                github: req.body.github,
                sobremim: req.body.sobreMim,
                sobreTrabalho: req.body.sobreTrabalho,
                senha: req.body.senha

            }).save().then(() => {
                req.flash("success_msg", "Cadastro feito com sucesso!")
                res.redirect("/")

            }).catch((error) => {
                req.flash("Error_msg", "Houve um erro ao cadastrar, tente novamente!")
                res.redirect("/")
            })
        }
    })
}


module.exports = { registroGet, registroPost } 