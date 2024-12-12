// Import the jsonwebtoken library to work with JWT tokens
const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const ensureAuthenticated = (req, res, next) => {
    // Get the Authorization header from the request
    const auth = req.headers['authorization'];

    // If there's no token, respond with a 403 error
    if (!auth) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
    }

    try {
        // Verify the token using the secret key and decode its content
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);

        // Add the decoded user data to the request object for later use
        req.user = decoded;

        // Move to the next middleware or route handler
        next();
    } catch (err) {
        // If the token is invalid or expired, respond with a 403 error
        return res.status(403).json({ message: 'Unauthorized, JWT token is invalid or expired' });
    }
}

// Export the function so it can be used in other parts of the app
module.exports = ensureAuthenticated;
