const formateurmodels = require("../models/formateurmodels");
const formation = require("../models/formation");
module.exports={
    createformateur : async (req,res) =>{
        try{
            const formateur = await formateurmodels (req.body)
            await formateur.save()
            //push
            const formationIds = req.body.formation;
            if (formationIds && formationIds.length > 0) {
                for (const formationId of formationIds) {
                    await formation.findOneAndUpdate({_id:formationId}, {
                        $push: { formateur: formateur }
                    });
                }}
            res.status(200).json({
                message:"user created successfully",
                success:true,
                data:formateur})
        }catch(error){
            res.status(400).json({
                message:"creation failed"+error,
                success:false,
                data:null})
        }
    },
    getformateur : async (req,res) =>{
        try{
            const formateur = await formateurmodels.find()
            res.status(200).json({
                message:"formation retrieved successfully",
                success:true,
                data:formateur})
        }catch{
            res.status(400).json({
                message:"retrieval failed",
                success:false,
                data:null})
        }
    },

    deleteformateur: async (req, res) => {
        try {
            const formateurId = req.params.id;
            const formateur = await formateurmodels.findByIdAndDelete(formateurId); 
            
            if (!formateur) {
                return res.status(404).json({
                    message: "user not found",
                    success: false
                });
            }
            
            res.status(200).json({
                message: "user deleted successfully",
                success: true,
                data: formateur
            });
        } catch (error) {
            res.status(400).json({
                message: "Deletion failed",
                success: false,
                error: error.message 
            });
        }
   
},

updateformateur: async (req, res) => {
    try {
        const formateurId = req.params.id
        const updatedData = req.body;
        
        const formateur = await formateurmodels.findByIdAndUpdate(formateurId, updatedData, { new: true });

        if (!formateur) {
            return res.status(404).json({
                message: "user not found",
                success: false,
                data: null
            });
        }

        res.status(200).json({
            message: "cours updated successfully",
            success: true,
            data: formateur
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