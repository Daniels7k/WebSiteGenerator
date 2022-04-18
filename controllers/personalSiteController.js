//Modulos
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuario")


function getData (req, res) {
    Usuario.findOne({usuario: req.params.slug}).then((data) => {
        res.render("usuario/meuSite", {data})
    })
}

module.exports = {getData}