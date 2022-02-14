const express = require("express")
const router = express.Router()
const siteController = require("../controllers/siteController")

// GET
router.get("/formulario", siteController.renderForm)

//POST
router.post("/your-site", siteController.getData)

module.exports = router