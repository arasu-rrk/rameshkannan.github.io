import React from 'react';
import './NameAnimation.css'; // Import your CSS file

const NameAnimation = () => {
  const name = "YourName"; // Replace with your name
  const letters = name.split('');

  return (
    <h1 className="name-container">
      {letters.map((letter, index) => (
        <span
          key={index}
          className="name-letter text-9xl text-teal-700"
          style={{ animationDelay: `${index * 0.1}s` }} // Stagger the animation
        >
          {letter}
        </span>
      ))}
    </h1>
  );
};

export default NameAnimation;