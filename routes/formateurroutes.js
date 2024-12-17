const formateurcontrolleur = require("../controlleur/formateurcontrolleur")
const routes = require("express").Router()
routes.post("/add",formateurcontrolleur.createformateur)
routes.get("/get",formateurcontrolleur.getformateur)
routes.delete("/delete/:id",formateurcontrolleur.deleteformateur)
routes.put("/update/:id",formateurcontrolleur.updateformateur)
module.exports = routes