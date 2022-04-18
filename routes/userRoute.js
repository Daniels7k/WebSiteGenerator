const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController")
const personalSiteController = require("../controllers/personalSiteController")

//Registro
router.get("/registro", UserController.registroGet)
router.post("/registroPost", UserController.registroPost )

//Login
router.get("/login", UserController.loginGet)
router.post("/login", UserController.loginPost)
//MeuSite
router.get("/meusite/:slug", personalSiteController.getData )

module.exports = router