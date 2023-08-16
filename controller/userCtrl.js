const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken.js");

//create a user
const createUser = asyncHandler(async (req, res) => {
    const { email } = req.body.email;
    const findUser = await User.findOne({ email: email });

    if (!findUser) {

        const newUser = await User.create(req.body);
        res.json(newUser);

    } else {
        throw new Error("user already exists");
    };
});

//login a user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (findUser && (await findUser.isPasswordMatched(password))) {
        
        res.json({
            _id: findUser?._id,
            username:findUser?.username,
            email:findUser?.email,
            token: generateToken(findUser._id)
        });

    } else {
        throw new Error("Invalid credentials.");
    };
});

module.exports = { createUser, loginUser }