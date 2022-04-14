const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController")

//Registro
router.get("/registro", UserController.registroGet)
router.post("/registroPost", UserController.registroPost )

//MeuSite
router.get("/meusite", (req, res) => {
    res.render("usuario/meusite")
})
module.exports = router