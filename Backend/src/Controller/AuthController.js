import { User } from "../models/users.model.js";
import { Project } from "../models/project.model.js";
import bcrypt from "bcrypt";
import jwtWebToken from "jsonwebtoken";


const handleUserLogin = async (req, res) => {
    console.log("Login request received");
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email: email });
        console.log(email + " " + password + " " + userData);

        if (!userData) {
            return res.status(403).json({
                message: "Authentication failed email or password is wrong",
                success: false
            });
        }

        const passKey = userData.password;
        const check = await bcrypt.compare(password, passKey);

        if (!check) {
            return res.status(403).json({
                message: "Authentication failed email or password is wrong",
                success: false
            });
        }

        const token = jwtWebToken.sign({
            sub: userData._id,
            email: userData.email,
            role: userData.role
        },
            process.env.JWT_SECRET,
            { expiresIn: '1d' })


        res.cookie("token", token, {
            httpOnly: true,      // 🔐 cannot access via JS (secure)
            secure: false,       // true in production (HTTPS)
            sameSite: "lax",     // helps with CSRF
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });


        return res.status(200).json({
            message: "User created successfully !!!",
            success: true,
            token,
            user: userData
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "External Server Error..",
            success: false
        })

    }
}

const handleUserRegister = async (req, res) => {
    console.log("Register request received");
    try {
        const { name, email, mobile, password, role, department, isActive } = req.body;
        const user = await User.findOne({ email: email });

        console.log(name, email, mobile, password, role, department, isActive)
        if (user) {
            return res.status(409).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 15);
        const userModel = await User.create({
            name,
            email,
            mobile,
            password: hashedPassword,
            role,
            department,
            isActive
        });

        if (!userModel) {
            return res.status(403).json({
                message: "Fail to create user",
                success: false
            });
        }

        // const token = jwtWebToken.sign({
        //     sub: userModel._id,
        //     email: userModel.email,
        //     role: userModel.role
        // }, process.env.JWT_SECRET, { expiresIn: '1d' })

        return res.status(200).json({
            message: "User created successfully !!!",
            success: true,
            user: userModel
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }

}

const handleUserLogout = async (req, res) => {
    try {
        // Invalidate the token on the client side by setting it to null or an empty string
        return res.status(200).json({
            message: "User logged out successfully",
            success: true,
            token: null
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

const handleGetUserProfile = async (req, res) => {
    console.log("Get user profile request received");
    try {
        const { id } = req.params; // Assuming you have middleware to set req.userId from the token
        const user = await User.findById({ _id: id }).select('-password'); // Exclude password from the response

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // const projects = await Project.find({ createdBy: id }); // Find projects where the user is a member
        // const userObj = user.toObject(); // convert to plain object
        // userObj.projects = projects;

        return res.status(200).json({
            message: "User profile retrieved successfully",
            success: true,
            user: user
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

const handleGetAllUsers = async (req, res) => {

    try {
        if (!req.user.role.includes("admin") && !req.user.role.includes("sub-admin")) {
            return res.status(403).json({
                message: "Forbidden, only admin and sub-admin can access this resource",
                success: false,
            })
        }

        const users = await User.find().select("-password");

        if (users.length === 0) {
            return res.status(404).json({
                message: "No users found",
                success: false,
            })
        }

        return res.status(200).json({
            message: "Users retrieved successfully",
            success: true,
            data: users,
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        })
    }
}


export {
    handleUserLogin,
    handleUserRegister,
    handleUserLogout,
    handleGetUserProfile,
    handleGetAllUsers
}