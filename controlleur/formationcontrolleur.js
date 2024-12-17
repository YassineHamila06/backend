const formation = require("../models/formation")
const cours = require("../models/coursmodels")
module.exports={
    createformation : async (req,res) =>{
        try{
            const formationclass = await formation (req.body)
            await formationclass.save()
            //push formation dans cours
            const coursIds = req.body.cours;
            if (coursIds && coursIds.length > 0) {
                for (const coursId of coursIds) {
                    await cours.findOneAndUpdate({_id:coursId}, {
                        $push: { formation: formationclass }
                    });
                }}
            res.status(200).json({
                message:"formation created successfully",
                success:true,
                data:formationclass})
        }catch(err){
            res.status(400).json({
                message:"creation failed"+err,
                success:false,
                data:null})
        }
    },


    getformation : async (req,res) =>{
        try{
            const formationclasse = await formation.find()
            res.status(200).json({
                message:"formation retrieved successfully",
                success:true,
                data:formationclasse})
        }catch{
            res.status(400).json({
                message:"retrieval failed",
                success:false,
                data:null})
        }
    },


    deleteformation: async (req, res) => {
        try {
            const formationId = req.params.id
            const formationclass = await formation.findByIdAndDelete(formationId);

            if (!formationclass) {
                return res.status(404).json({
                    message: "formation not found",
                    success: false,
                    data: null
                });
            }

            res.status(200).json({
                message: "formation deleted successfully",
                success: true,
                data: formationclass
            });
        } catch{
            res.status(400).json({
                message: "deletion failed",
                success: false,
                error: error.message
            });
        }
    },
    updateformation: async (req, res) => {
        try {
            const formaId = req.params.id
            const updatedData = req.body;

            const formationclasse = await formation.findByIdAndUpdate(formaId, updatedData, { new: true});

            if (!formationclasse) {
                return res.status(404).json({
                    message: "formation not found",
                    success: false,
                    data: null
                });
            }

            res.status(200).json({
                message: "formation updated successfully",
                success: true,
                data: formationclasse
            });
        } catch{
            res.status(400).json({
                message: "update failed",
                success: false,
                error: error.message
            });
        }
    }
}