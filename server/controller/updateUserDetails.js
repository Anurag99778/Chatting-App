const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken');
const UserModel = require('../models/UserModel');

async function updateUserDetails(request, response) {
    try {
        const token = request.cookies.token || "";
        console.log('Token:', token);

        const user = await getUserDetailsFromToken(token);
        console.log('User from token:', user);

        if (!user) {
            return response.status(401).json({
                message: "User not authenticated",
                error: true
            });
        }

        const { name, profile_pic } = request.body;
        console.log('Request body:', request.body);

        await UserModel.updateOne({ _id: user._id }, { name, profile_pic });

        const updatedUser = await UserModel.findById(user._id).select('-password');
        console.log('Updated user:', updatedUser);

        return response.json({
            message: "User updated successfully",
            data: updatedUser,
            success: true
        });
    } catch (error) {
        console.error('Error updating user details:', error);
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = updateUserDetails;
