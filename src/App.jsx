import { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Welcome to the reception! I am the AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI typing delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev, 
        { role: 'assistant', text: "I'm just a demo right now, but soon I'll be connected to the Python backend to answer that!" }
      ]);
    }, 1000);
  };

  return (
    <div className="reception-bg">
      <div className="reception-container">
        
        {/* Header / Avatar Area */}
        <div className="reception-header">
          <div className="avatar">👩‍💼</div>
          <div>
            <h1>AI Receptionist</h1>
            <p>Online • Ready to help</p>
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form className="input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Ask your question here..." 
          />
          <button type="submit">Send</button>
        </form>
        
      </div>
    </div>
  );
}

export default App;