// import jwt from "jsonwebtoken";

// export const authenticate = (req, res, next) => {
//   // Read token from header: auth-token
//   const token = req.header("auth-token");

//   if (!token) {
//     return res.status(401).json({ message: "Access denied. Token missing." });
//   }

//   try {
//     // Verify token
//     const verified = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach decoded user data to request
//     req.user = verified;

//     next(); // Continue to protected route
//   } catch (error) {
//     return res.status(400).json({ message: "Invalid token." });
//   }
// };



import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const auth = async (req, res, next) => {

  try {

    // const token =
    //   req.headers.authorization?.split(" ")[1];

    const token = req.header("auth-token");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token"
      });
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // FIND USER
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    req.user = user;

    next();

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Unauthorized"
    });

  }

};

export default auth;
