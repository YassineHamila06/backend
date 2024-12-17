const User = require('../models/usermodels');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const nodemailer = require("nodemailer");
const ACCESS_TOKEN = process.env.Rtoken ;
const REFRESH_TOKEN =process.env.Stoken ;
const generateAccesstoken = (user) =>{
    return jwt.sign({id:user.id},ACCESS_TOKEN,{expiresIn:'30m'});
}
const generateRefreshtoken = (user) =>{
    return jwt.sign({id:user.id},REFRESH_TOKEN,{expiresIn:'60m'});
}
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
  }
});
let refreshTokens = []
module.exports={
login: async (req, res) => {
        try {
          const { email, password } = req.body;
          // Vérifier si l'étudiant existe
          const user = await User.findOne({ email:email});
          if (!user) {
            return res.status(400).json({ message: 'Email incorrect' });
          }
          // Vérifier le mot de passe
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({ message: 'mot de passe incorrect' });
          }
          // Generate tokens
          const ACCESS_TOKEN = generateAccesstoken(user);
          const refresh_token = generateRefreshtoken(user);
          // Save the refresh token
          refreshTokens.push(refresh_token);
          res.status(200).json({
            message: 'Login successful',
            data: user,
            accessToken: ACCESS_TOKEN,
            refreshToken: refresh_token
          });
        } catch (err) {
          //console.log(err);
          console.error(err);
          res.status(500).json({ message: 'An error occurred during login'+err });
        }
      },
      

      
      forgotPassword: async (req, res) => {
        try {
            const user = await User.findOne({email:req.body.email});
            if (!user) {
                return res.status(400).json({ message: 'User with this email does not exist' });
            }else{
              const access_Token = jwt.sign({_id:user._id},ACCESS_TOKEN,{expiresIn:'5m'})
              await User.findOneAndUpdate({email:req.body.email},{token:access_Token},{new:true})
              const send= await transporter.sendMail({
                from:'"Maddison Foo Koch :ghost:" <maddison53@ethereal.email>',
                to:user.email,
                subject:"forget password",
                html:`<b>your token</b>,<a href=http://localhost:3000/user/reset/${access_Token}>Clic here</a>`
            })
            res.status(200).json({
                success:true,
                message:"you can change password",
                data:user
            })
            }
        } catch (error) {
            res.status(400).json({ message: 'erreur'+error ,success:false,data:null});
        }
    }, 
            resetPassword:async(req,res)=>{
              try{
                  const verifyToken=await jwt.verify(req.params.token,ACCESS_TOKEN,async(error)=>{
                      if(error){
                          res.status(400).json({
                              success:false,
                              message:"Invalid token",
                              data:null
                          })
                      }
                      const user=await User.findOne({token:req.params.token})
                      console.log("",user)
                      const newpass=await req.body.password
                      user.password=newpass
                      user.token=undefined
                       await user.save()
                      res.status(200).json({
                          success:true,
                          message:"your password has been changed",
                          data:null
                      })
                  })
              }catch(error){
                  res.status(400).json({
                      success:false,
                      message:"Internal server error"+error,
                      data:null
                  })
              }
          }
};