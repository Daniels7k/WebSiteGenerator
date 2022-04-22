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
    //Verificando autorização para editar dados
    const token = req.cookies.authorizationToken
    if (!token) {
        req.flash("error_msg", "Você deve estar logado para editar dados")
        res.redirect("/usuarios/login")
    }
    if (token) {
        jwt.verify(token, "segredo", (err, payload) => {
            //Tratando erro
            if(err){
                req.flash("error_msg", "Token Inválido")
                res.redirect("/usuarios/login")
            }else{
                //Dando acesso
                Usuario.findOne({_id: payload.id }).then((usuario) => {
                    res.render("usuario/editarPerfil", {usuario})
                })
            }
        })
    }
}

function editDataPost(req, res) {
    //Verificando autorização para editar dados
    const token = req.cookies.authorizationToken
    if (token) {
        jwt.verify(token, "segredo", (err, payload) => {
            Usuario.findOne({ _id: payload.id }).then((usuario) => {
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
                    req.flash("error_msg", "Houve um erro ao alterar os dados tente novamente!")
                    res.redirect(`/usuarios/meusite/${usuario.usuario}`)
                })
            })    
        })
    }

}

module.exports = { getData, editDataGet, editDataPost }