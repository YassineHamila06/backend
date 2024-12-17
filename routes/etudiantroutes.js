const etudiantcontrolleur = require("../controlleur/etudiantcontrolleur")
const upload = require("../middleware/upload")
const routes = require("express").Router()
routes.post("/add",upload.single('cv'),etudiantcontrolleur.createetudiant)
routes.get("/get",etudiantcontrolleur.getetudiant)
routes.delete("/delete/:id",etudiantcontrolleur.deleteetudiant)
routes.put("/update/:id",upload.single('cv'),etudiantcontrolleur.updateetudiant)
module.exports = routes