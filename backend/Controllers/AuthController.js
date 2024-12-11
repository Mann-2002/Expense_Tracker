// Import required dependencies
const bcrypt = require('bcrypt'); // For hashing and comparing passwords securely
const jwt = require('jsonwebtoken'); // For generating and verifying JSON Web Tokens
const UserModel = require("../Models/User"); // User schema model for database operations

// Function to handle user signup
const signup = async (req, res) => {
    try {
        // Destructure user input from the request body
        const { name, email, password } = req.body;

        // Check if a user with the given email already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            // If user exists, send a conflict response
            return res.status(409).json({ 
                message: 'User already exists, you can login', 
                success: false 
            });
        }

        // Create a new user object
        const userModel = new UserModel({ name, email, password });

        // Hash the user's password before saving it to the database
        userModel.password = await bcrypt.hash(password, 10);

        // Save the new user to the database
        await userModel.save();

        // Respond with success when signup is complete
        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        // Handle unexpected server errors
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Function to handle user login
const login = async (req, res) => {
    try {
        // Destructure user input from the request body
        const { email, password } = req.body;

        // Fetch the user from the database using the email
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Authentication failed: email or password is incorrect';

        // If no user is found, respond with an error
        if (!user) {
            return res.status(403).json({ 
                message: errorMsg, 
                success: false 
            });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            // If passwords do not match, respond with an error
            return res.status(403).json({ 
                message: errorMsg, 
                success: false 
            });
        }

        // Generate a JWT token for the authenticated user
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id }, // Payload
            process.env.JWT_SECRET,              // Secret key
            { expiresIn: '24h' }                 // Token expiration time
        );

        // Respond with success and include the generated token
        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken, // Include the token in the response
            email,
            name: user.name
        });
    } catch (err) {
        // Handle unexpected server errors
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Export the signup and login functions to be used in other parts of the application
module.exports = {
    signup,
    login
};
