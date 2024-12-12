// Importing Joi for validating user input data
const Joi = require('joi');

// Function to validate signup data
// It checks if the name is between 3 and 100 characters, 
// the email is a valid email format, and the password is between 4 and 100 characters.
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(), // Name must be 3-100 characters long
        email: Joi.string().email().required(), // Email must be in a valid format
        password: Joi.string().min(4).max(100).required() // Password must be 4-100 characters long
    });
    const { error } = schema.validate(req.body); // Validate the input data
    if (error) {
        // If validation fails, send a 400 Bad Request response with the error details
        return res.status(400).json({ message: "Bad request", error });
    }
    // If validation passes, move to the next middleware
    next();
}

// Function to validate login data
// It checks if the email is in a valid format and the password is between 4 and 100 characters.
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(), // Email must be in a valid format
        password: Joi.string().min(4).max(100).required() // Password must be 4-100 characters long
    });
    const { error } = schema.validate(req.body); // Validate the input data
    if (error) {
        // If validation fails, send a 400 Bad Request response with the error details
        return res.status(400).json({ message: "Bad request", error });
    }
    // If validation passes, move to the next middleware
    next();
}

// Exporting the validation functions to be used in other parts of the application
module.exports = {
    signupValidation,
    loginValidation
}
