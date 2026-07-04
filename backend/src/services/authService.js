const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

// ===============================
// REGISTER USER
// ===============================
const registerUser = async (
    fullName,
    email,
    password
) => {

    const existingUser =
        await userModel.findUserByEmail(email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const passwordHash =
        await bcrypt.hash(password, 10);

    const user =
        await userModel.createUser(
            fullName,
            email,
            passwordHash
        );

    return user;
};

// ===============================
// LOGIN USER
// ===============================
const loginUser = async (
    email,
    password
) => {

    const user =
        await userModel.findUserByEmail(email);

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password_hash
        );

    if (!isMatch) {
        throw new Error("Invalid password");
    }

    return user;
};

// ===============================
// PROFILE
// ===============================
const getProfile = async (
    userId
) => {

    const user =
        await userModel.findUserById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

module.exports = {
    registerUser,
    loginUser,
    getProfile
};