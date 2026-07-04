const authService = require("../services/authService");
const { generateToken } = require("../utils/jwt");

// ===============================
// REGISTER
// ===============================
const register = async (req, res, next) => {
    try {

        const {
            fullName,
            email,
            password
        } = req.body;

        const user =
            await authService.registerUser(
                fullName,
                email,
                password
            );

        const token =
            generateToken(user);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user
        });

    } catch (error) {
        next(error);
    }
};

// ===============================
// LOGIN
// ===============================
const login = async (req, res, next) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await authService.loginUser(
                email,
                password
            );

        const token =
            generateToken(user);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user
        });

    } catch (error) {

        next(error);

    }

};

// ===============================
// PROFILE
// ===============================
const profile = async (
    req,
    res,
    next
) => {

    try {

        const user =
            await authService.getProfile(
                req.user.id
            );

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        next(error);

    }

};

module.exports = {
    register,
    login,
    profile
};