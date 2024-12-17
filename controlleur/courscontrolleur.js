const coursmodels = require("../models/coursmodels")
module.exports={
    createcours : async (req,res) =>{
        try{
            req.body.image=req.file.filename//teb3a image
            const cours = await coursmodels (req.body)
            await cours.save()
            res.status(200).json({
                message:"cours created successfully",
                success:true,
                data:cours})
        }catch(err){
            res.status(400).json({
                message:"creation failed"+err,
                success:false,
                data:null})
        }
    },

    getcours : async (req,res) =>{
        try{
            const courses = await coursmodels.find().populate('formation')//populate ma3neha tjiblk les attrebut lkol mta3  el id li 3mtlo push
            res.status(200).json({
                message:"cours retrieved successfully",
                success:true,
                data:courses})
        }catch{
            res.status(400).json({
                message:"retrieval failed",
                success:false,
                data:null})
        }
    },


  
  deletecours: async (req, res) => {
        try {
            const coursId = req.params.id;
            const cour = await coursmodels.findByIdAndDelete(coursId); 
            
            if (!cour) {
                return res.status(404).json({
                    message: "Course not found",
                    success: false
                });
            }
            
            res.status(200).json({
                message: "Course deleted successfully",
                success: true,
                data: cour
            });
        } catch (error) {
            res.status(400).json({
                message: "Deletion failed"+error,
                success: false,
                error: error.message 
            });
        }
   
},

updatecours: async (req, res) => {
    try {
        const courseId = req.params.id
        const updatedData = req.body;
        req.body.image=req.file.filename //teb3 image
        
        const cours = await coursmodels.findByIdAndUpdate(courseId, updatedData, { new: true });

        if (!cours) {
            return res.status(404).json({
                message: "cours not found",
                success: false,
                data: null
            });
        }

        res.status(200).json({
            message: "cours updated successfully",
            success: true,
            data: cours
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
