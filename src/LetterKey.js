import './App.css';
import library from './wordlibrary.txt'
import React, { useState, useEffect, useRef } from 'react';

function LetterKey({ letter, isHintMode, resetFlag, handleInput, handleSubmit, handleBackspace }) {
    const [backgroundColor, setBackgroundColor] = useState('gray');
    const [fontColor, setFontColor] = useState('white');
    //const charRef = useRef(letter);
    //charRef.current.value = letter;

  
    const handleClick = () => {
      if (isHintMode) {
        const colors = ['gray', '#242424', 'yellow', 'green'];
        const nextColorIndex = (colors.indexOf(backgroundColor) + 1) % colors.length;
        setBackgroundColor(colors[nextColorIndex]);
        
        // Setting font color based on background color
        if (colors[nextColorIndex] === 'gray' || colors[nextColorIndex] === '#242424') {
          setFontColor('white');
        } else {
          setFontColor('black');
        }
      } else {
        console.log("typed letter: " + letter);
        if (letter==="Enter") {
          console.log("enter hit");
          handleSubmit();
        } else if (letter==="Back") {
          handleBackspace();
        } else {
          handleInput(letter);
        }
      }
    };
  
    React.useEffect(() => {
      setBackgroundColor('gray');
      setFontColor('white');
    }, [resetFlag]);
  
    return (
      <div>
        <button
          className='letter-key'
          style={{ backgroundColor: backgroundColor, color: fontColor }}
          onClick={handleClick}
        >
          {letter.toUpperCase()}
        </button>
      </div>
    );
  }

  export default LetterKey;