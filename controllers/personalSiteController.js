//Modulos
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuario")


function getData (req, res) {
    Usuario.findOne({email: "cleitondaniel.19@gmail.com"}).then((data) => {
        res.render("usuario/meuSite", {data})
    })
}

module.exports = {getData}