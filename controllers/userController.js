//Modulos
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
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
                usuario: req.body.usuario,
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


//Login
function loginGet (req, res) {
    res.render("usuario/login")
}

function loginPost (req, res) {
    //Verificando preexistencia de email
    Usuario.findOne({email: req.body.email}).then((usuario) => {
        if(!usuario){
            req.flash("error_msg", "Este email não esta cadastrado, tente se cadastrar!")
            res.redirect("/usuarios/registro")
        }else{
            const token = jwt.sign({id:usuario.id}, "segredo")
            res.cookie("authorizationToken", token)
            req.flash("sucess_msg", "Logado com sucesso")
            res.redirect(`/usuarios/meusite/${usuario.usuario}`)
        }
    }).catch((error) => {
        req.flash("error_msg", "Houve um erro interno!")
        res.redirect("/usuario/login")
    })
}

module.exports = { registroGet, registroPost, loginGet }