//Modulos
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
require("../models/Usuario")
const Usuario = mongoose.model("usuario")


function getData(req, res) {
    Usuario.findOne({ usuario: req.params.slug }).then((data) => {
        res.render("usuario/meuSite", { data })
    })
}

function editDataGet(req, res) {
    Usuario.findOne({ usuario: req.params.slug }).then((usuario) => {
        res.render("usuario/editarPerfil", { usuario })
    })
}

function editDataPost(req, res) {
    //Buscando no banco de dados
    Usuario.findOne({ usuario: req.body.usuarioHidden }).then((usuario) => {

        usuario.nome = req.body.nome
        usuario.usuario = req.body.usuario
        usuario.email = req.body.email
        usuario.profissao = req.body.profissao
        usuario.linkedin = req.body.linkedin
        usuario.github = req.body.github
        usuario.sobreMim = req.body.sobreMim
        usuario.sobreTrabalho = req.body.sobreTrabalho
        usuario.senha = req.body.senha

        //Salvando no banco de dados
        usuario.save().then(() => {
            req.flash("success_msg", "Dados alterados com sucesso!")
            res.redirect(`/usuarios/meusite/${usuario.usuario}`)
            //Tratando Erro
        }).catch((error) => {
            console.log(error)
            req.flash("error_msg", "Houve um erro ao alterar os dados tente novamente!")
            res.redirect(`/usuarios/meusite/${usuario.usuario}`)
        })
        //Tratando Erro
    }).catch((error) => {
        req.flash("error_msg", "Houve um erro ao buscar os dados os dados tente novamente!")
        res.redirect("")
    })
}

module.exports = { getData, editDataGet, editDataPost }