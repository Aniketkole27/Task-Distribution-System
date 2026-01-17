import { User } from "../Models/Users";
import bcrypt from "bcrypt";
import jwtWebToken from "jsonwebtoken";


export const login = async(req,res) =>
{
    try{
        const{email ,password} = req.body;
        
        const user = await User.findOne({email});

        if(!user){
            return res.status(403).json({message:"Authentication failed email or password is wrong",success:false});
        }
        
        const passKey = user.password;

        const check = await bcrypt.compare(passKey,password);

        if(!check)
        {
            return res.status(403).json({message:"Authentication failed email or password is wrong",success:false});
        }
        
        const jsonwebtoken = jwtWebToken.sign({emai:user.email,id:user.id},process.env.secreat_Key,{expires:'24h'})

        return res.status(200).json({message:"Login Successfully",jsonwebtoken,success:true,email,
                name : user.name,
                role:user.role});
    }
    catch
    {
        res.status(500).json({message:"External Server Error ",success:false})
    }
}

export const register = async(req,res) =>{
     
try{
    const{email,name,password,role} = req.body;
    
    const user = await User.findOne({email:email});
    if(user)
    {
        return res.satus(409).json({message:"User already exists",success: false} );
    }

    const userModel = new User({name,email,password,role});
    userModel.password = await bcrypt.hash(password,hash);

    await userModel.save();

    res.status(201).json({message:"User created successfully !!!",success:true})
}
catch
{
   res.status(500).json({message:"Internal Server Error",success:false});
}

}