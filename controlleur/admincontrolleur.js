const adminmodels = require("../models/adminmodels")
module.exports={
    createadmin : async (req,res) =>{
        try{
            const admin = await adminmodels (req.body)
            await admin.save()
            res.status(200).json({
                message:"user created successfully",
                success:true,
                data:admin})
        }catch{
            res.status(400).json({
                message:"creation failed",
                success:false,
                data:null})
        }
    },
    getadmin : async (req,res) =>{
        try{
            const admine = await adminmodels.find()
            res.status(200).json({
                message:"user retrieved successfully",
                success:true,
                data:admine})
        }catch{
            res.status(400).json({
                message:"retrieval failed",
                success:false,
                data:null})
        }
    },

    deleteadmin: async (req, res) => {
        try {
            const adminId = req.params.id;
            const admin = await adminmodels.findByIdAndDelete(adminId); 
            
            if (!admin) {
                return res.status(404).json({
                    message: "user not found",
                    success: false
                });
            }
            
            res.status(200).json({
                message: "user deleted successfully",
                success: true,
                data: admin
            });
        } catch (error) {
            res.status(400).json({
                message: "Deletion failed",
                success: false,
                error: error.message 
            });
        }
   
},
    updateadmin: async (req, res) => {
    try {
        const adminId = req.params.id
        const updatedData = req.body;
        
        const admin = await adminmodels.findByIdAndUpdate(adminId, updatedData, { new: true });

        if (!admin) {
            return res.status(404).json({
                message: "user not found",
                success: false,
                data: null
            });
        }

        res.status(200).json({
            message: "user updated successfully",
            success: true,
            data: admin
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