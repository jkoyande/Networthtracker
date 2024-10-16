// handlers/usersHandler.js
const { User } = require('../models/userModel'); // Assuming you've set up a User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Define Joi schema for user validation
const userSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

// Create a user
const createUser = async (request, h) => {
    const { username, password, email } = request.payload;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Store user in the database
    const user = await User.create({ username, password: hashedPassword, email });
    
    return h.response({ id: user.id, username: user.username }).code(201);
};

// User login
const loginUser = async (request, h) => {
    const { username, password } = request.payload;

    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return h.response({ message: 'Invalid username or password' }).code(401);
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return h.response({ token }).code(200);
};

module.exports = {
    createUser,
    loginUser,
    userSchema,
};
