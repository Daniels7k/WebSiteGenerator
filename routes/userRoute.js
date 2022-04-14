const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController")

//Registro
router.get("/registro", UserController.registroGet)
router.post("/registroPost", UserController.registroPost )

module.exports = router