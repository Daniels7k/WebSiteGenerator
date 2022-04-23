const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController")
const personalSiteController = require("../controllers/personalSiteController")
const teste = require('../helper/cookie')

//Registro
router.get("/registro", UserController.registroGet)
router.post("/registroPost", UserController.registroPost )

//Login
router.get("/login", UserController.loginGet)
router.post("/loginPost", UserController.loginPost)

//Logout 
router.get("/logout", UserController.logout)

//MeuSite
router.get("/meusite/:slug", personalSiteController.getData)
router.get("/todos", personalSiteController.allSites)

//Editando dados
router.get("/meusite/:slug/edit", personalSiteController.editDataGet)
router.post("/meusite/editPost", personalSiteController.editDataPost)

//

//Testes
router.get("/cookie", (req, res) => {

        console.log(res.locals)
} )

module.exports = router