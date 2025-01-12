import React, { useState } from 'react';
import './SaveTogether.css';

const SaveTogether = () => {
  const [circles, setCircles] = useState([
    { id: 1, name: 'Village Entrepreneurs', goal: 50000, current: 30000, members: 10, description: 'Supporting local businesses and artisans' },
    { id: 2, name: 'Women\'s Education Fund', goal: 100000, current: 75000, members: 15, description: 'Empowering women through education' },
    { id: 3, name: 'Community Well Project', goal: 200000, current: 150000, members: 25, description: 'Clean water access for all' },
  ]);

  const [newCircle, setNewCircle] = useState({ name: '', goal: '', members: '', description: '' });
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCreateCircle = (e) => {
    e.preventDefault();
    if (newCircle.name && newCircle.goal && newCircle.members) {
      setCircles([...circles, {
        id: circles.length + 1,
        ...newCircle,
        goal: parseFloat(newCircle.goal),
        members: parseInt(newCircle.members),
        current: 0
      }]);
      setNewCircle({ name: '', goal: '', members: '', description: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleContribute = (id, amount) => {
    setCircles(circles.map(circle => {
      if (circle.id === id) {
        const newAmount = Math.min(circle.current + amount, circle.goal);
        if (newAmount === circle.goal) {
          setTimeout(() => alert(`Congratulations! ${circle.name} has reached its goal! 🎉`), 500);
        }
        return { ...circle, current: newAmount };
      }
      return circle;
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="save-together">
      <div className="flag-strip"></div>
      <div className="container">
        <div className="header">
          <h2>Collaborative Saving Circles</h2>
          <p className="subtitle">Join hands to achieve community goals together</p>
        </div>

        <div className="circles-container">
          {circles.map(circle => (
            <div key={circle.id} className="circle">
              <div className="circle-header">
                <h3>{circle.name}</h3>
                <span className="member-badge">{circle.members} members</span>
              </div>
              <p className="circle-description">{circle.description}</p>
              <div className="circle-stats">
                <div className="stat">
                  <span className="label">Goal</span>
                  <span className="value">{formatCurrency(circle.goal)}</span>
                </div>
                <div className="stat">
                  <span className="label">Raised</span>
                  <span className="value">{formatCurrency(circle.current)}</span>
                </div>
              </div>
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${(circle.current / circle.goal) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {Math.round((circle.current / circle.goal) * 100)}% Complete
                </span>
              </div>
              <div className="contribution-controls">
                <div className="amount-selector">
                  {[500, 1000, 2000, 5000].map(amount => (
                    <button
                      key={amount}
                      className={`amount-btn ${selectedAmount === amount ? 'selected' : ''}`}
                      onClick={() => setSelectedAmount(amount)}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => handleContribute(circle.id, selectedAmount)}
                  className="contribute-btn"
                  disabled={circle.current >= circle.goal}
                >
                  {circle.current >= circle.goal ? 'Goal Reached! 🎉' : `Contribute ${formatCurrency(selectedAmount)}`}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="create-circle">
          <h3>Start a New Saving Circle</h3>
          <form onSubmit={handleCreateCircle}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Circle Name"
                value={newCircle.name}
                onChange={(e) => setNewCircle({ ...newCircle, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Saving Goal (₹)"
                value={newCircle.goal}
                onChange={(e) => setNewCircle({ ...newCircle, goal: e.target.value })}
                required
                min="1000"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Number of Members"
                value={newCircle.members}
                onChange={(e) => setNewCircle({ ...newCircle, members: e.target.value })}
                required
                min="2"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Circle Description"
                value={newCircle.description}
                onChange={(e) => setNewCircle({ ...newCircle, description: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="create-btn">Create New Circle</button>
          </form>
        </div>

        {showSuccess && (
          <div className="success-toast">
            New saving circle created successfully! 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveTogether;

