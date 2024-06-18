const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
require('dotenv').config();

const getUserDetailsFromToken = async (token) => {
    if (!token) {
        throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECREAT_KEY);
    const user = await UserModel.findById(decoded.id).select('-password');

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

module.exports = getUserDetailsFromToken;
