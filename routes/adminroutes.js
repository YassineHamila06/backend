const admincontrolleur = require("../controlleur/admincontrolleur")
const routes = require("express").Router()
routes.post("/add",admincontrolleur.createadmin)
routes.get("/get",admincontrolleur.getadmin)
routes.delete("/delete/:id",admincontrolleur.deleteadmin)
routes.put("/update/:id",admincontrolleur.updateadmin)
module.exports = routes