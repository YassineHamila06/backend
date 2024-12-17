const usercontrolleur = require("../controlleur/userconttrolleur")
const routes = require("express").Router()
routes.post('/login',usercontrolleur.login)
routes.post('/forget',usercontrolleur.forgotPassword)
routes.post('/reset/:token',usercontrolleur.resetPassword)
module.exports = routes