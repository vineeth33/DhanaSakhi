import { BookOpen, Calculator, MessageCircle, Mic, PiggyBank, Send, VolumeIcon as VolumeUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import './AICoach.css';

const AICoach = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOffline, setIsOffline] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('coach');

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setIsLoading(true);
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: getAIResponse(input), sender: 'ai' }]);
        setIsLoading(false);
      }, 1000);
      setInput('');
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setInput('How can I save money for my child\'s education?');
      setIsListening(false);
    }, 2000);
  };

  const getAIResponse = (query) => {
    // Simulate AI response based on query
    const responses = {
      'save money': 'To save money for your child\'s education, consider opening a dedicated savings account and setting up automatic monthly transfers. You can also explore government schemes like Sukanya Samriddhi Yojana for girl children.',
      'default': 'I\'m here to help you with your financial queries. Could you please provide more details about your question?'
    };

    return query.toLowerCase().includes('save money') ? responses['save money'] : responses['default'];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'coach':
        return (
          <div className="chat-container">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message ai">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
        );
      case 'budget':
        return <div className="section-content">Budget planning tools and tips will be displayed here.</div>;
      case 'learn':
        return <div className="section-content">Financial education resources and courses will be shown here.</div>;
      case 'save':
        return <div className="section-content">Collaborative saving features and group savings plans will be presented here.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="ai-coach">
      <div className="container">
        <div className="sidebar">
          <div className="logo">FinCoach</div>
          <nav className="nav-buttons">
            <button className={`nav-button ${activeSection === 'coach' ? 'active' : ''}`} onClick={() => setActiveSection('coach')}>
              <MessageCircle size={24} />
              <span>AI Coach</span>
            </button>
            <button className={`nav-button ${activeSection === 'budget' ? 'active' : ''}`} onClick={() => setActiveSection('budget')}>
              <Calculator size={24} />
              <span>Budget</span>
            </button>
            <button className={`nav-button ${activeSection === 'learn' ? 'active' : ''}`} onClick={() => setActiveSection('learn')}>
              <BookOpen size={24} />
              <span>Learn</span>
            </button>
            <button className={`nav-button ${activeSection === 'save' ? 'active' : ''}`} onClick={() => setActiveSection('save')}>
              <PiggyBank size={24} />
              <span>Save Together</span>
            </button>
          </nav>
        </div>
        <div className="main-content">
          <div className="header">
            <h2>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
            <div className="status-indicator"></div>
          </div>
          {renderSection()}
          {activeSection === 'coach' && (
            <div className="input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your financial question..."
                disabled={isOffline}
                className="chat-input"
              />
              <button 
                onClick={handleSend} 
                disabled={isOffline || !input.trim() || isLoading}
                className="send-button"
              >
                <Send size={20} />
              </button>
              <button 
                onClick={handleVoiceInput} 
                disabled={isOffline || isListening}
                className={`voice-button ${isListening ? 'listening' : ''}`}
              >
                {isListening ? <VolumeUp size={20} /> : <Mic size={20} />}
              </button>
            </div>
          )}
          {isOffline && <p className="offline-message">You're offline. Some features may be limited.</p>}
        </div>
      </div>
    </div>
  );
};

export default AICoach;
