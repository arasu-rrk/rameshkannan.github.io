import React from 'react';
import './TypingAnimation.css';

const TypingAnimation = () => {
  const name = "Ramesh Kannan.";
  const letters = name.split('');

  return (
    <h1 className="typing-container">
      {letters.map((letter, index) => (
        <span
          key={index}
          className="typing-letter text-9xl text-blue-700 bg-yellow-100"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
};

export default TypingAnimation;