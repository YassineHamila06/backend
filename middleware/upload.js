const multer = require("multer")
const storage= multer.diskStorage({
    //destination de l'image
    destination:function(req, file,cb){
        cb(null,"./storages")
    },
    //non de fichier
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null,uniqueSuffix)
    }
})
const upload = multer({
    storage: storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==="image/png" ||
        file.mimetype==="image/jpeg" ||
        file.mimetype==="image/jpg" ||
        file.mimetype === "application/pdf") {
            cb(null,true)
        }
        else{
            cb(new Error("fichier incompatible"))
        }
    }
})
module.exports=upload