const formationcontrolleur = require("../controlleur/formationcontrolleur")
const routes = require("express").Router()
routes.post("/add",formationcontrolleur.createformation)
routes.get("/get",formationcontrolleur.getformation)
routes.delete("/delete/:id",formationcontrolleur.deleteformation)
routes.put("/update/:id",formationcontrolleur.updateformation)
module.exports = routes