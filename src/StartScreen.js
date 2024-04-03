import { keyboard } from '@testing-library/user-event/dist/keyboard';
import React, { useState, useEffect, useRef } from 'react';
import './StartScreen.css';

function StartScreen({handleStartScreen}) {

    return(
        
      <div className="start-body">
        <body scroll="no">
        <h1>Codle</h1>
        <h3>8 chances to guess the word, but you don't know which letters are correct.</h3>
        <button onClick={handleStartScreen}>Play</button>
        <div className="help-category">
            <span className={'yellowdot'}></span>
            <p>= a letter is in the correct word, but not in that spot.</p>
            </div><div className="help-category">
            <span className={'greendot'}></span>
            <p>= a letter is in the correct word and in the correct spot.</p>
            </div><div className="help-category">
            <span className={'greydot'}></span>
            <p>= a letter is not in the correct word.</p>
        </div>
        </body>
      </div>
    )
  }

  export default StartScreen;