import React, { useState } from 'react';
import './Learn.css';

const Learn = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const stories = [
    {
      title: "Rani's Savings Adventure",
      content: "Rani wants to start a small business selling handmade crafts. She has two options for managing her initial savings:",
      choices: [
        { 
          text: "Save money in a piggy bank at home", 
          score: 5,
          feedback: "While saving at home is a start, it's not the safest option and you miss out on interest earnings."
        },
        { 
          text: "Open a savings account in a bank", 
          score: 10,
          feedback: "Excellent choice! A bank account is safer and helps earn interest on savings."
        }
      ],
      image: "🏦"
    },
    {
      title: "The Market Dilemma",
      content: "Rani needs to buy vegetables for her family and wants to make a smart financial decision. She can:",
      choices: [
        { 
          text: "Buy from the local market in bulk", 
          score: 5,
          feedback: "Good thinking! Buying in bulk can save money, but storage might be an issue."
        },
        { 
          text: "Start a small kitchen garden", 
          score: 10,
          feedback: "Perfect! Growing your own vegetables saves money long-term and provides fresh produce."
        }
      ],
      image: "🌱"
    },
    {
      title: "Emergency Fund Challenge",
      content: "Rani's child falls sick and needs immediate medical attention. She needs ₹5000 for treatment. She decides to:",
      choices: [
        { 
          text: "Borrow money from a moneylender", 
          score: 0,
          feedback: "Be careful! Moneylenders often charge very high interest rates that can lead to debt."
        },
        { 
          text: "Use her emergency fund savings", 
          score: 10,
          feedback: "Great decision! This is exactly why maintaining an emergency fund is important."
        }
      ],
      image: "🏥"
    }
  ];

  const handleChoice = (choiceIndex) => {
    setIsAnimating(true);
    const choice = stories[currentStory].choices[choiceIndex];
    const newScore = score + choice.score;
    setScore(newScore);
    setUserChoices([...userChoices, choiceIndex]);
    setFeedback(choice.feedback);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentStory < stories.length - 1) {
        setCurrentStory(currentStory + 1);
      }
      setIsAnimating(false);
    }, 2000);
  };

  const resetGame = () => {
    setCurrentStory(0);
    setUserChoices([]);
    setScore(0);
    setShowFeedback(false);
    setIsAnimating(false);
  };

  const getScoreMessage = () => {
    if (score >= 25) return "Outstanding! You're a financial guru! 🎯";
    if (score >= 15) return "Good job! You're on the right track! 👍";
    return "Keep learning! Every financial decision matters! 📚";
  };

  const getScoreColor = () => {
    if (score >= 25) return "#138808"; // Green
    if (score >= 15) return "#FF9933"; // Orange
    return "#000080"; // Navy Blue
  };

  return (
    <div className="learn">
      <div className="flag-strip"></div>
      <div className="container">
        <h2>Financial Wisdom Journey</h2>
        <p className="subtitle">Learn smart money management through everyday stories</p>
        
        <div className="story-container">
          {currentStory < stories.length ? (
            <div className={`story-content ${isAnimating ? 'fade-out' : 'fade-in'}`}>
              <div className="story-header">
                <span className="story-emoji">{stories[currentStory].image}</span>
                <h3>{stories[currentStory].title}</h3>
              </div>
              <p className="story-text">{stories[currentStory].content}</p>
              
              {showFeedback ? (
                <div className="feedback-message">
                  {feedback}
                </div>
              ) : (
                <div className="choices">
                  {stories[currentStory].choices.map((choice, index) => (
                    <button 
                      key={index} 
                      onClick={() => handleChoice(index)} 
                      className="choice-btn"
                      disabled={isAnimating}
                    >
                      {choice.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="game-over">
              <div className="score-circle" style={{ borderColor: getScoreColor() }}>
                <div className="score-content">
                  <h3>Score</h3>
                  <span className="score-number">{score}</span>
                  <span className="score-total">/30</span>
                </div>
              </div>
              <h3 className="score-message">{getScoreMessage()}</h3>
              <p className="score-detail">
                You've completed your financial learning journey! 
                {score === 30 ? " Perfect score! You're ready to make great financial decisions!" : 
                 " Want to improve your score? Try again!"}
              </p>
              <button onClick={resetGame} className="reset-btn">
                Play Again
              </button>
            </div>
          )}
        </div>

        {currentStory < stories.length && (
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${((currentStory + 1) / stories.length) * 100}%` }}
              ></div>
            </div>
            <div className="progress-text">
              Story {currentStory + 1} of {stories.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;

