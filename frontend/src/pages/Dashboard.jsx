import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function Dashboard({ filteredExpenses }) {

    const data_pie = {
        labels: ['Housing', 'Groceries', 'Transportation', 'Health', 'Debt Payments', 'Entertainment', 'Clothing', 'Other'],
        datasets: [
          {
            label: 'Expense',
            data: [
              filteredExpenses.filter(exp => exp.type === 'Housing').reduce((acc, exp) => acc - exp.amount, 0),
              filteredExpenses.filter(exp => exp.type === 'Groceries').reduce((acc, exp) => acc - exp.amount, 0),
              filteredExpenses.filter(exp => exp.type === 'Transportation').reduce((acc, exp) => acc - exp.amount, 0),
              filteredExpenses.filter(exp => exp.type === 'Health').reduce((acc, exp) => acc - exp.amount, 0),
              filteredExpenses.filter(exp => exp.type === 'Debt Payments').reduce((acc, exp) => acc - exp.amount, 0),
              filteredExpenses.filter(exp => exp.type === 'Entertainment').reduce((acc, exp) => acc - exp.amount, 0),
              filteredExpenses.filter(exp => exp.type === 'Clothing').reduce((acc, exp) => acc - exp.amount, 0),
              filteredExpenses.filter(exp => exp.type === 'Other').reduce((acc, exp) => acc - exp.amount, 0),
            ],
            backgroundColor: [
              '#FF5733', '#FF8D1A', '#FFC300', '#28A745', '#DC3545', '#17A2B8', '#6F42C1', '#E83E8C'
            ],
            borderColor: [
              '#C70039', '#FF5733', '#FF8D1A', '#28A745', '#DC3545', '#17A2B8', '#6F42C1', '#E83E8C'
            ],
            borderWidth: 1,
          },
        ],
      };


    // Group expenses by date and calculate the total amount for each day
    const groupedData = filteredExpenses.reduce((acc, expense) => {
        const date = new Date(expense.date).toISOString().split('T')[0]; // Get date part (YYYY-MM-DD)
        if (!acc[date]) {
        acc[date] = 0;
        }
        acc[date] -= expense.amount;
        return acc;
    }, {});

    // Get the earliest and latest dates in the data
    const allDates = Object.keys(groupedData).map(date => new Date(date));
    const startDate = new Date(Math.min(...allDates));
    const endDate = new Date(Math.max(...allDates));

    // Generate a continuous timeline of dates between startDate and endDate
    const dateRange = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dateRange.push(new Date(currentDate).toISOString().split('T')[0]); // Format as YYYY-MM-DD
        currentDate.setDate(currentDate.getDate() + 1); // Increment by 1 day
    }

    // Fill in missing dates with 0 amounts
    const filledData = dateRange.map(date => ({
        date,
        amount: groupedData[date] || 0, // Use existing amount or 0 if missing
    }));

    // Convert data into arrays for the chart
    const dates = filledData.map(entry => entry.date); // X-axis labels (dates)
    const amounts = filledData.map(entry => entry.amount); // Y-axis values (amounts)

    const data_line = {
        labels: dates, // Dates as x-axis labels
        datasets: [
          {
            label: 'Net Expense',
            data: amounts, // Amount of expenses for each date
            fill: false,
            borderColor: '#FF5733', // Line color
            tension: 0.1,
          },
        ],
      };


    return (
        <div className="dashboard-container">
            <h3>Expense Breakdown</h3>
                <Line data={data_line} />
                <div className='divider'></div>
                <Pie data={data_pie} />
        </div>
    );
}

export default Dashboard;