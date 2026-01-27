import { User } from "../Models/Users.js";
import bcrypt from "bcrypt";
import jwtWebToken from "jsonwebtoken";


export const login = async(req,res) =>
{
    try{
        const{email ,password} = req.body;
        const userData = await User.findOne({email:email});
         console.log(email+" "+password+" "+userData);

        if(!userData){
            return res.status(403).json({message:"Authentication failed email or password is wrong",success:false});
        }
        
        const passKey = userData.password;

        const check = await bcrypt.compare(password, passKey);


        if(!check)
        {
            return res.status(403).json({message:"Authentication failed email or password is wrong",success:false});
        }
        
        const jsonwebtoken = jwtWebToken.sign({email:userData.email,id:userData._id},process.env.SK,{expiresIn:'24h'})

        return res.status(200).json({message:"Login Successfully",jsonwebtoken,success:true,email,
                name : userData.name,
                role:userData.role});
    }
    catch
    {
        res.status(500).json({message:"External Server Error ",success:false})
    }
}

export const register = async(req,res) =>{
     
try{
    const{email,name,mobile,password} = req.body;
    
    const user = await User.findOne({email:email});
    if(user)
    {
        return res.status(409).json({message:"User already exists",success: false} );
    }

    const hashedPassword = await bcrypt.hash(password,10);

     const userModel = new User({
      name,
      email,
      mobile,
      password: hashedPassword
    });

    await userModel.save();

    res.status(201).json({message:"User created successfully !!!",success:true})
}
catch
{
   res.status(500).json({message:"Internal Server Error",success:false});
}

}