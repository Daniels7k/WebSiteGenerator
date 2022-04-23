//Modulos
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
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
                sobreMim: req.body.sobreMim,
                sobreTrabalho: req.body.sobreTrabalho,
                senha: bcrypt.hashSync(req.body.senha)

            })

            novoUsuario.save().then(() => {
                req.flash("success_msg", "Cadastro feito com sucesso!")
                res.redirect("/usuarios/login")

            }).catch((error) => {
                console.log(error)
                req.flash("error_msg", "Houve um erro ao cadastrar, tente novamente!")
                res.redirect("/usuarios/registro")
            })
        }
    })
}


//Login
function loginGet(req, res) {
    res.render("usuario/login")
}

function loginPost(req, res) {
    //Verificando preexistencia de email
    Usuario.findOne({ email: req.body.email }).then((usuario) => {
        if (!usuario) {
            req.flash("error_msg", "Este email não esta cadastrado, tente se cadastrar!")
            res.redirect("/usuarios/login")
        } else {
            //Comparando senha com hash
            const passwordAndUserMatch = bcrypt.compareSync(req.body.senha, usuario.senha)
            if (!passwordAndUserMatch) {
                req.flash("error_msg", "Email/Senha incorretos")
                res.redirect("/usuarios/login")
            } else {
                //Criando token de autorização
                const token = jwt.sign({ id: usuario.id, name: usuario.nome, usuario: usuario.usuario }, "segredo")
                res.cookie("authorizationToken", token)
                req.flash("success_msg", "Logado com sucesso")
                res.redirect(`/usuarios/meusite/${usuario.usuario}`)
            }

        }
    }).catch((error) => {
        console.log(error)
        //Tratando o erros
        req.flash("error_msg", "Houve um erro interno!")
        res.redirect("/usuarios/login")
    })
}

//Logout
function logout(req, res) {
    var cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }
        res.cookie(prop, '', { expires: new Date(0) });
    }
    req.flash("success_msg", "Logout feito com sucesso!")
    res.redirect('/bem-vindo');
}

module.exports = { registroGet, registroPost, loginGet, loginPost, logout }