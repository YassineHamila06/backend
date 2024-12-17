const courscontrolleur = require("../controlleur/courscontrolleur")
const upload = require('../middleware/upload')//teb3a image
const routes = require("express").Router()
routes.post("/add",upload.single('image'),courscontrolleur.createcours)//upload.single('image') teb3a image
routes.get("/get",courscontrolleur.getcours)
routes.delete("/delete/:id",courscontrolleur.deletecours)
routes.put("/update/:id",upload.single('image'),courscontrolleur.updatecours)
module.exports = routes