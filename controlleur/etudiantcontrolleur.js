const etudiantmodels = require("../models/etudiantmodels")
module.exports={
    createetudiant : async (req,res) =>{
        try{
            req.body.cv=req.file.filename//teb3a cv
            const etudiant = await etudiantmodels (req.body)
            await etudiant.save()
            res.status(200).json({
                message:"user created successfully",
                success:true,
                data:etudiant})
        }catch(error){
            res.status(400).json({
                message:"creation failed"+error,
                success:false,
                data:null})
        }
    },
    getetudiant : async (req,res) =>{
        try{
            const etudiante = await etudiantmodels.find()
            res.status(200).json({
                message:"user retrieved successfully",
                success:true,
                data:etudiante})
        }catch{
            res.status(400).json({
                message:"retrieval failed",
                success:false,
                data:null})
        }
    },

    deleteetudiant: async (req, res) => {
        try {
            const etudiantId = req.params.id;
            const etudiant = await etudiantmodels.findByIdAndDelete(etudiantId); 
            
            if (!etudiant) {
                return res.status(404).json({
                    message: "user not found",
                    success: false
                });
            }
            
            res.status(200).json({
                message: "user deleted successfully",
                success: true,
                data: etudiant
            });
        } catch (error) {
            res.status(400).json({
                message: "Deletion failed",
                success: false,
                error: error.message 
            });
        }
   
},

    updateetudiant: async (req, res) => {
    try {
        const etudiantId = req.params.id
        const updatedData = req.body;
        req.body.cv=req.file.filename//teb3a  cv
        
        const etudiant = await etudiantmodels.findByIdAndUpdate(etudiantId, updatedData, { new: true });

        if (!etudiant) {
            return res.status(404).json({
                message: "user not found",
                success: false,
                data: null
            });
        }

        res.status(200).json({
            message: "user updated successfully",
            success: true,
            data: etudiant
        });
    } catch (error) {
        res.status(400).json({
            message: "update failed",
            success: false,
            error: error.message
        });
    }
}
}