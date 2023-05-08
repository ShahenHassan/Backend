const passport = require("passport");
const UserModel = require("../models/user.model.js");
const CustomError = require("../CustomError.js");

const signUpMiddleware = passport.authenticate("signup", {
  session: false,
});

const protect = passport.authenticate("jwt", { session: false });

const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.user.sub);

      if (!user || user.role !== role) {
        throw CustomError("not authorized", 401, 4000);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
exports.signUpMiddleware = signUpMiddleware;
exports.protect = protect;
exports.checkRole = checkRole;
