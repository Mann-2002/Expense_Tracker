// Import the User model to interact with the database
const UserModel = require("../Models/User");

// Function to add a new expense for a user
const addExpenses = async (req, res) => {
    const body = req.body; // Get the expense details from the request body
    const { _id } = req.user; // Get the authenticated user's ID

    try {
        // Add the expense to the user's expense list in the database
        const userData = await UserModel.findByIdAndUpdate(
            _id, // User's ID
            { $push: { expenses: req.body } }, // Add the new expense to the list
            { new: true } // Return the updated document
        );

        // Respond with success and send back the updated expenses
        return res.status(200).json({
            message: "Expense added successfully",
            success: true,
            data: userData?.expenses
        });
    } catch (err) {
        // Respond with an error if something goes wrong
        return res.status(500).json({ 
            message: "Something went wrong", 
            error: err, 
            success: false 
        });
    }
};

// Function to get all expenses for a user
const fetchExpenses = async (req, res) => {
    const { _id } = req.user; // Get the authenticated user's ID

    try {
        // Retrieve the user's expenses from the database
        const userData = await UserModel.findById(_id).select('expenses');

        // Respond with success and send back the user's expenses
        return res.status(200).json({
            message: "Expenses fetched successfully",
            success: true,
            data: userData?.expenses
        });
    } catch (err) {
        // Respond with an error if something goes wrong
        return res.status(500).json({ 
            message: "Something went wrong", 
            error: err, 
            success: false 
        });
    }
};

// Function to delete a specific expense for a user
const deleteExpenses = async (req, res) => {
    const { _id } = req.user; // Get the authenticated user's ID
    const { expenseId } = req.params; // Get the ID of the expense to delete

    try {
        // Remove the specific expense from the user's expense list
        const userData = await UserModel.findByIdAndUpdate(
            _id, // User's ID
            { $pull: { expenses: { _id: expenseId } } }, // Remove the expense by its ID
            { new: true } // Return the updated document
        );

        // Respond with success and send back the updated expenses
        return res.status(200).json({
            message: "Expense deleted successfully",
            success: true,
            data: userData?.expenses
        });
    } catch (err) {
        // Respond with an error if something goes wrong
        return res.status(500).json({ 
            message: "Something went wrong", 
            error: err, 
            success: false 
        });
    }
};

// Export the functions for use in other parts of the app
module.exports = {
    addExpenses,
    fetchExpenses,
    deleteExpenses
};
