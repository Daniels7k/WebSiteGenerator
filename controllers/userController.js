//Modulos
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuario")

//Funções

function registroGet (req, res) {
    res.render("usuario/registro")
}

module.exports = {registroGet} 