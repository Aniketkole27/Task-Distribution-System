import jwt from "jsonwebtoken";

const ensureAuthenticated = (req, res, next) => {
    // console.log("Request = ", req.headers)
    const auth = req.cookies?.token || req.headers?.authorization;
    // console.log("Auth = ", auth)

    if (!auth) {
        return res.status(401).json({
            message: "Unauthorized , token is require"
        });
    }

    try {
        const token = auth.split(" ");
        const jwtToken = token.length === 2 ? token[1] : token[0];
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized , JWT token is wrong or expired" });
    }
}

export { ensureAuthenticated }