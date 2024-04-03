import './App.css';
import library from './wordlibrary.txt'
import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import Confetti from 'react-confetti';
import Statistics from './Statistics';
import LetterKey from './LetterKey';
import Keyboard from './Keyboard'
import StartScreen from './StartScreen';

var randomWord = "";

function getCorrectLetters({ input, correctWord }) {
  const correctLetters = [];
  const greenLetters = [];
  let tempCorrectWord = correctWord;

  if (input === undefined) {
    return correctLetters; // Return empty array if input is undefined
  }

  for (let i = 0; i < input.length; i++) {
    const letter = input[i];
    if (tempCorrectWord.charAt(i) === letter) {
      correctLetters.push('agreen');
      greenLetters.push(letter);
      tempCorrectWord = tempCorrectWord.replace(letter, " ");
    }
  }

  for (let i = 0; i < input.length; i++) {
    const letter = input[i];
    if (greenLetters.includes(letter)) {
      const index = greenLetters.indexOf(letter);
      greenLetters.splice(index, 1);
    } else if (tempCorrectWord.includes(letter)) {
      correctLetters.push('byellow');
      tempCorrectWord = tempCorrectWord.replace(letter, " ");
    } else {
      correctLetters.push('gray');
    }
  }

  
  correctLetters.sort(); // Sort correctLetters array
  return correctLetters;
}


function Results({input, correctWord}) {
  const correctLetters = getCorrectLetters({input, correctWord});
    return (
      <div>
      {correctLetters.map((color, index) => (
          <span
              key={index}
              className={`${color}dot`} // Add color class to dot
          ></span>
      ))}
    </div>
    );
}

function EmptyResults() {
  return (
    <div className="empty-dot-row">
      <span
          className={`emptydot`} 
      ></span>
      <span
          className={`emptydot`} 
      ></span>
      <span
          className={`emptydot`} // Add color class to dot
      ></span>
      <span
          className={`emptydot`} // Add color class to dot
      ></span>
      <span
          className={`emptydot`} // Add color class to dot
      ></span>
    </div>
  )
}


function App() {
  const [words, setWords] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(8);
  const [correctWord, setCorrectWord] = useState("");
  const [isHintMode, setHintMode] = useState(false);
  const [isLoseModalOpen, setIsLoseModalOpen] = useState(false);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [stats, setStats] = useState([]);
  const [isStartScreenShowing, setIsStartScreenShowing] = useState(true);


  const char1Ref = useRef(null);
  const char2Ref = useRef(null);
  const char3Ref = useRef(null);
  const char4Ref = useRef(null);
  const char5Ref = useRef(null);

  const [resetFlag, setResetFlag] = useState(false);

  const addStat = (stat) => {
    setStats(prevStats => [...prevStats, stat]);
  }

  // Function to reset all keys
  const resetKeys = () => {
    setResetFlag(prevFlag => !prevFlag);
  };

  const componentsArray = Array.from({ length: guessesLeft }, (_, index) => (
    <EmptyResults key={index} />
  ));

  const toggleHintMode = () => {
    setHintMode(prevHintMode => !prevHintMode); // Toggle the state between true and false
  };
  
  const openWinModal = () => {
    setIsWinModalOpen(true);
    console.log("open modal");
  };

  // Function to close the modal
  const closeWinModal = () => {
    setIsWinModalOpen(false);
    chooseWord();
  };

  const openLoseModal = () => {
    setIsLoseModalOpen(true);
    console.log("open modal");
  };

  // Function to close the modal
  const closeLoseModal = () => {
    setIsLoseModalOpen(false);
    chooseWord();
  };

  const openStatsModal = () => {
    setIsStatsModalOpen(true);
    console.log("open modal");
  };

  // Function to close the modal
  const closeStatsModal = () => {
    setIsStatsModalOpen(false);
  };

  const handleInput = (ref) => {
    if (ref.current.value.length === 1) {
      // Move to the next input box if a character is typed
      switch (ref) {
        case char1Ref:
          char2Ref.current.focus();
          break;
        case char2Ref:
          char3Ref.current.focus();
          break;
        case char3Ref:
          char4Ref.current.focus();
          break;
        case char4Ref:
          char5Ref.current.focus();
          break;
        default:
          break;
      }
    }
  };

  const handleScreenInput = (letter) => {
    if (char1Ref.current.value == "") {
      char1Ref.current.value = letter;
    } else if (char2Ref.current.value == "") {
      char2Ref.current.value = letter;
    } else if (char3Ref.current.value == "") {
      char3Ref.current.value = letter;
    } else if (char4Ref.current.value == "") {
      char4Ref.current.value = letter;
    } else if (char5Ref.current.value == "") {
      char5Ref.current.value = letter;
    }
  };


  const handleBackspace = (ref, event) => {
    if (event.key === 'Backspace' && ref.current.value.length === 0) {
      // Move to the previous input box if backspace is pressed and the current input box is empty
      switch (ref) {
        case char2Ref:
          char1Ref.current.focus();
          break;
        case char3Ref:
          char2Ref.current.focus();
          break;
        case char4Ref:
          char3Ref.current.focus();
          break;
        case char5Ref:
          char4Ref.current.focus();
          break;
        default:
          break;
      }
    }
  };

  const handleScreenBackspace = (ref, event) => {
    if (char5Ref.current.value != "") {
      char5Ref.current.value = "";
    } else if (char4Ref.current.value != "") {
      char4Ref.current.value = "";
    } else if (char3Ref.current.value != "") {
      char3Ref.current.value = "";
    } else if (char2Ref.current.value != "") {
      char2Ref.current.value = "";
    } else if (char1Ref.current.value != "") {
      char1Ref.current.value = "";
    }
  };

  function chooseWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    char1Ref.current.value = "";
    char2Ref.current.value = "";
    char3Ref.current.value = "";
    char4Ref.current.value = "";
    char5Ref.current.value = "";
    randomWord = words[randomIndex];
    setCorrectWord(randomWord);
    console.log(randomWord);
    setGuessesLeft(8);
    setGuesses([]);
    resetKeys();
    return randomWord;
  }

  useEffect(() => {
    fetch(library)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        const wordsArray = data.split(',').map(word => word.trim());
        setWords(wordsArray);
        chooseWord();
        console.log(wordsArray);
        return wordsArray; // Return wordsArray to chain next .then
      })
      .catch(error => {
        console.error('Error reading file:', error);
      });
      
  }, []);

  

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (correctWord == null) {
      chooseWord();
      console.log(correctWord);
    }

    
    // Concatenate the values of all input boxes to form a single string
    const inputValue = [
      char1Ref.current.value,
      char2Ref.current.value,
      char3Ref.current.value,
      char4Ref.current.value,
      char5Ref.current.value,
    ].join('').trim();


    console.log(inputValue);
    console.log(correctWord);
    if (correctWord != null && inputValue.toLowerCase() === correctWord.toLowerCase()) {
      openWinModal();
      addStat(guesses.length + 1);
      console.log(stats);
    }

    if (inputValue.length === 5 && guesses.length < 8) {
      setGuesses(prevGuesses => [...prevGuesses, inputValue]); // Append input value to guesses array
      event.target.reset(); // Clear the input fields after submission
      char1Ref.current.focus();
      setGuessesLeft(guessesLeft - 1);
      if (guessesLeft === 1 && inputValue.toLowerCase() !== correctWord.toLowerCase()) {
        addStat("X");
        console.log(stats);
        openLoseModal();
        console.log("you lose!");
      }
    }
    // Reset the form
    event.target.reset();
    char1Ref.current.focus();

  };

  const handleExternalSubmit = () => {
    // Trigger form submission programmatically
    document.getElementById('submit-button').click();
  };

  const confettiSource = {
    x: window.innerWidth / 2, // Center horizontally
    y: window.innerHeight,   // Bottom of the screen
    w: 0,
    h: 0
  };

  const handleIsStartScreenShowing = () => {
    setIsStartScreenShowing(false);
  };

  return (
    <div className='App-body'>
      {isStartScreenShowing && <StartScreen handleStartScreen={handleIsStartScreenShowing} />}
      <nav className="App-nav">
        <h3>Codle</h3>
        <button className="stats-button" onClick={openStatsModal}>Stats</button>
      </nav>
      <form onSubmit={handleSubmit}>
      <input 
        type="text"
        ref={char1Ref}
        maxLength="1"
        onInput={() => handleInput(char1Ref)}
        onKeyDown={(e) => handleBackspace(char1Ref, e)}
        defaultValue={""}
      />
      <input 
        type="text"
        ref={char2Ref}
        maxLength="1"
        onInput={() => handleInput(char2Ref)}
        onKeyDown={(e) => handleBackspace(char2Ref, e)}
        defaultValue={""}
      />
      <input
        type="text"
        ref={char3Ref}
        maxLength="1"
        onInput={() => handleInput(char3Ref)}
        onKeyDown={(e) => handleBackspace(char3Ref, e)}
        defaultValue={""}
      />
      <input
        type="text"
        ref={char4Ref}
        maxLength="1"
        onInput={() => handleInput(char4Ref)}
        onKeyDown={(e) => handleBackspace(char4Ref, e)}
        defaultValue={""}
      />
      <input 
        type="text"
        ref={char5Ref}
        maxLength="1"
        onInput={() => handleInput(char5Ref)}
        onKeyDown={(e) => handleBackspace(char5Ref, e)}
        defaultValue={""}
      />
      <input id="submit-button" type="submit" value="Submit" />
    </form>
      
    
      
      
      <ul className='guesses'>
        {guesses.map((guess, index) => (
          <li className='guess' key={index}>{guess.toUpperCase()} <Results
          input={guess.toUpperCase()}
          correctWord= {correctWord.toUpperCase()}
        /> 
        </li>
        
        ))}
        {componentsArray}
      </ul>
      
      <Keyboard isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleScreenInput} handleSubmit={handleExternalSubmit} handleBackspace={handleScreenBackspace}/>
      <button className="notes-button" onClick={toggleHintMode}>
        {isHintMode ? 'Disable Notes Mode' : 'Enable Notes Mode'}
      </button>
      <button className="start-button" onClick={resetKeys}>Clear notes</button>
      <button className="start-button" onClick={chooseWord}>New game</button>
      <p className="tip">tip: enable notes mode to mark which letters you've solved.</p>
      
      

      {isWinModalOpen && (
        <Modal closeModal={closeWinModal} isModalOpen={isWinModalOpen}>
          <h2>You win!</h2>
          <ul id="modal-guesses">
          {guesses.map((guess, index) => (
            <li id="modal-guess" key={index}><Results
            input={guess.toUpperCase()}
            correctWord= {correctWord.toUpperCase()}
          /> </li>
          ))}
        </ul>
        <button onClick={openStatsModal}>View Stats</button>
        <Confetti
          numberOfPieces={300} // Adjust the number of confetti pieces as needed
          recycle={false} // Prevent confetti from being reused
          gravity={0.48} // Adjust gravity to control falling speed
          initialVelocityX={window.innerWidth / 150} // Initial X velocity of confetti pieces
          initialVelocityY={40} // Initial Y velocity of confetti pieces
          confettiSource={confettiSource} // Specify the confetti source
          tweenDuration={15000}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }} // Ensure confetti appears behind the modal
        />
        </Modal>
      )}

  {isLoseModalOpen && (
        <Modal closeModal={closeLoseModal} isModalOpen={isLoseModalOpen}>
          <h2>You lose</h2>
          <p>Correct word: {correctWord}</p>
          <ul id="modal-guesses">
          {guesses.map((guess, index) => (
            <li id="modal-guess" key={index}><Results
            input={guess.toUpperCase()}
            correctWord= {correctWord.toUpperCase()}
          /> </li>
          ))}
        </ul>
        <button onClick={openStatsModal}>View Stats</button>
        </Modal>
      )}


{isStatsModalOpen && (
        <Modal closeModal={closeStatsModal} isModalOpen={isStatsModalOpen}>
          <h2>Stats</h2>
          <p>{stats.length} games played</p>
          <Statistics statsArray={stats} />
        </Modal>
      )}
    </div>
  );

  
}
export default App;
