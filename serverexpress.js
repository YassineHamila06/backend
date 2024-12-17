const express = require('express');
const app = express();
const path =require('path')
const cors = require('cors')
app.use(cors())
const port = 3000;
 //el express 7atineha fi constant bch nedioulou toul
app.use(express.json())
const db = require("./database");
db()
const env = require('dotenv').config()
const coursrouteur = require("./routes/coursroutes");
app.use('/cours',coursrouteur)

const formationrouteur = require("./routes/formationroutes");
app.use('/formation',formationrouteur)

const adminrouteur = require("./routes/adminroutes");
app.use('/admin',adminrouteur)

const etudiantrouteur = require("./routes/etudiantroutes");
app.use('/etudiant',etudiantrouteur)

const formateurrouteur = require("./routes/formateurroutes");
app.use('/formateur',formateurrouteur)

const userrouteur = require("./routes/userroutes");
app.use('/user',userrouteur)
app.get("/:img", (req, res) => {
    res.sendFile(path.join(__dirname, 'storages', req.params.img));
    console.log(req.params.img)
}); //hedhi zedneha ki 7abina na3mlou afichage ll liste cours / hedhi bch ki tafichi el image matatla3 vide 

app.listen (port,function(){
    console.log(`the server is running, please open at http://localhost:${port}`);
});