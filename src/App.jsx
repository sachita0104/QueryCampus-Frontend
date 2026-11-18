import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Welcome to the reception! I am the AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Reference for the hidden file input
  const fileInputRef = useRef(null);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    
    const newMessages = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true); // Show typing indicator

    // Simulate AI thinking delay
    setTimeout(() => {
      setIsTyping(false); // Hide typing indicator
      setMessages((prev) => [
        ...prev, 
        { role: 'assistant', text: `You asked about "${text}". I'm currently a demo, but soon the Python backend will answer this perfectly!` }
      ]);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      sendMessage(`[Uploaded File: ${file.name}]`);
    }
    // Reset file input so the same file can be uploaded again if needed
    e.target.value = null; 
  };

  const quickReplies = [
    "Where is the admissions office?",
    "What is the fee structure?",
    "How do I book a campus tour?"
  ];

  return (
    <div className="reception-bg">
      <div className="reception-container">
        
        <div className="reception-header">
          <div className="avatar">👩‍💼</div>
          <div>
            <h1>AI Receptionist</h1>
            <p>Online • Ready to help</p>
          </div>
        </div>

        <div className="chat-window">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              {msg.text}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="message assistant typing-indicator">
              <span>.</span><span>.</span><span>.</span>
            </div>
          )}

          {/* Quick Replies */}
          {messages.length === 1 && !isTyping && (
            <div className="quick-replies">
              {quickReplies.map((reply, index) => (
                <button key={index} onClick={() => sendMessage(reply)}>
                  {reply}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input Area with File Upload */}
        <form className="input-area" onSubmit={handleSubmit}>
          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            style={{ display: 'none' }} 
          />
          
          {/* Paperclip Button */}
          <button 
            type="button" 
            className="attach-btn" 
            onClick={() => fileInputRef.current.click()}
            title="Upload a document"
          >
            📎
          </button>

          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type your question here..." 
            className="chat-input"
          />
          <button type="submit" className="send-btn">Send</button>
        </form>
        
      </div>
    </div>
  );
}

export default App;