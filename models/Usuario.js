const mongooose = require("mongoose")
const Schema = mongooose.Schema

const Usuario = new Schema({
    nome:{ type: String, minlength:2, required: true},
    sobrenome: { type: String, minlength:2, required: true},
    email: { type: String, minlength:4, required: true},
    profissao: { type: String, minlength:3, required: true},
    linkedin: { type: String, required: true},
    github: { type: String, required: true},
    sobre: { type: String, required: true},
    senha: { type: String, minlength:8, maxlength: 200}
})

mongooose.model("usuario", Usuario)