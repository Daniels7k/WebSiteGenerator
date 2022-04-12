const express = require("express")
const router = express.Router()
const SiteController = require("../controllers/siteController")


router.get("/bem-vindo", SiteController.bemvindo)

module.exports = router