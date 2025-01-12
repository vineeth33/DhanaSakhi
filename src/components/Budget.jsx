import React, { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import './Budget.css';

const Budget = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '' });
  const [totalBudget, setTotalBudget] = useState(5000);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const calculatedSavings = totalBudget - expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setSavings(calculatedSavings > 0 ? calculatedSavings : 0);
  }, [expenses, totalBudget]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (newExpense.category && newExpense.amount) {
      setExpenses([...expenses, { ...newExpense, amount: parseFloat(newExpense.amount) }]);
      setNewExpense({ category: '', amount: '' });
    }
  };

  // Indian flag inspired colors
  const COLORS = ['#FF9933', '#138808', '#FFFFFF', '#FF8C00', '#006400'];

  const data = [
    ...expenses.map(expense => ({ name: expense.category, value: expense.amount })),
    { name: 'Savings', value: savings }
  ];

  return (
    <div className="budget">
      <div className="container">
        <div className="header">
          <div className="flag-strip"></div>
          <h2>AI-Driven Budget Tracker</h2>
          <p className="subtitle">Smart financial planning with Indian values</p>
        </div>
        
        <div className="budget-container">
          <div className="budget-form-section">
            <div className="card budget-form">
              <h3>Add New Expense</h3>
              <form onSubmit={handleAddExpense}>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Expense category"
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="input-group">
                  <input
                    type="number"
                    placeholder="Amount (₹)"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="form-input"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Expense
                </button>
              </form>
              <div className="total-budget">
                <label htmlFor="totalBudget">Total Budget (₹):</label>
                <input
                  type="number"
                  id="totalBudget"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(parseFloat(e.target.value))}
                  className="form-input"
                />
              </div>
            </div>

            <div className="card expense-summary">
              <h3>Summary</h3>
              <div className="summary-item">
                <span>Total Budget:</span>
                <span>₹{totalBudget}</span>
              </div>
              <div className="summary-item">
                <span>Total Expenses:</span>
                <span>₹{totalBudget - savings}</span>
              </div>
              <div className="summary-item highlight">
                <span>Savings:</span>
                <span>₹{savings}</span>
              </div>
            </div>
          </div>

          <div className="card budget-chart">
            <h3>Expense Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card ai-suggestion">
          <h3>AI Financial Guru Says:</h3>
          <p>{getSuggestion(expenses, savings, totalBudget)}</p>
        </div>
      </div>
    </div>
  );
};

const getSuggestion = (expenses, savings, totalBudget) => {
  const savingsPercentage = (savings / totalBudget) * 100;
  if (savingsPercentage >= 20) {
    return "Excellent work! Your savings align well with traditional Indian financial wisdom. Consider investing in long-term growth opportunities while maintaining your prudent spending habits.";
  } else if (savingsPercentage > 0) {
    return "You're making progress! Following the principle of 'cut your coat according to your cloth', try to identify areas where you can optimize expenses to boost your savings.";
  } else {
    return "Time for a careful review of your expenses. As the ancient wisdom says, 'A penny saved is a penny earned'. Let's work on bringing your budget back into balance.";
  }
};

export default Budget;
