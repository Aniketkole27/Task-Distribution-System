import joi from "joi";

export const loginValidation= (req,res,next) =>
{   
    const joiObj = joi.object({
    email : joi.string().email().required(),
    password : joi.string().min(4).max(10).required()});

    const {error} = joiObj.validate(req.body);

    if(error)
    {
        return res.status(400).json({message:"Bad request",success:false});
    }

    next();
}

export const signUpValidation = (req,res,next)=>{
    const joiObj = joi.object({
        name:joi.string().min().max(12).required(),
        email:joi.string().email().required(),
        password:joi.string().min(4).max(10).required(),
        role:joi.string().required(),
        department:joi.string(),
        isActive:joi.boolean
    })

    const {error} = joiObj.validate(req.body);

    if(error)
    {
        return res.status(400).json({message:"Bad request",success:false});
    }

    next();
}