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

export const signUpValidation = (req, res, next) => {
  const joiObj = joi.object({
    name: joi.string().min(4).max(12).required(),
    email: joi.string().email().required(),
    mobile: joi.string().length(10).required(),
    password: joi.string().min(4).max(10).required(),
    department: joi.string().optional()
  });

  const { error } = joiObj.validate(req.body, {
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      success: false
    });
  }

  next();
};
