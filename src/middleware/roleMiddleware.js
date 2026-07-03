const role = (...allowedRoles) => {

  return (req, res, next) => {

    // req.user comes from auth middleware

    if (!allowedRoles.includes(req.user.role)) {

      return res.status(403).json({
        success: false,
        message: "Access denied"
      });

    }

    next();

  };

};

export default role;