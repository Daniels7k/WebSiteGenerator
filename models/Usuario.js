const mongooose = require("mongoose")
const Schema = mongooose.Schema

const Usuario = new Schema({
    nome:{ type: String, minlength:2, required: true},
    usuario:{ type: String, minlength:4, required: true},
    email: { type: String, minlength:4, required: true},
    profissao: { type: String, minlength:3, required: true},
    linkedin: { type: String, required: true},
    github: { type: String, required: true},
    sobreMim: { type: String, required: true},
    sobreTrabalho: { type: String, required: true},
    senha: { type: String, minlength:8, maxlength: 200},
    CreatedAt: {type: Date, default: Date.now},
})

mongooose.model("usuario", Usuario)