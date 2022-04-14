const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController")
const personalSiteController = require("../controllers/personalSiteController")

//Registro
router.get("/registro", UserController.registroGet)
router.post("/registroPost", UserController.registroPost )

//MeuSite
router.get("/meusite", personalSiteController.getData )

module.exports = router