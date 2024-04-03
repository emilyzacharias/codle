import { keyboard } from '@testing-library/user-event/dist/keyboard';
import React, { useState, useEffect, useRef } from 'react';
import LetterKey from './LetterKey';

function Keyboard({isHintMode, resetFlag, handleInput, handleSubmit, handleBackspace}) {

    return(
      <div className='keyboard'>
        <div className='keyboard-row'>
          <LetterKey letter='q' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
          <LetterKey letter='w' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
          <LetterKey letter='e' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
          <LetterKey letter='r' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
          <LetterKey letter='t' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
          <LetterKey letter='y' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
          <LetterKey letter='u' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
          <LetterKey letter='i' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
          <LetterKey letter='o' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
          <LetterKey letter='p' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
        </div>
        <div className='keyboard-row'>
            <LetterKey letter='a' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
            <LetterKey letter='s' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
            <LetterKey letter='d' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
            <LetterKey letter='f' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
            <LetterKey letter='g' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
            <LetterKey letter='h' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
            <LetterKey letter='j' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
            <LetterKey letter='k' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
            <LetterKey letter='l' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
        </div>
        <div className='keyboard-row'>
            <LetterKey letter='Enter' handleSubmit={handleSubmit}/>
            <LetterKey letter='z' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
            <LetterKey letter='x' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
            <LetterKey letter='c' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
            <LetterKey letter='v' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
            <LetterKey letter='b' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
            <LetterKey letter='n' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
            <LetterKey letter='m' isHintMode={isHintMode} resetFlag={resetFlag} handleInput={handleInput}/>
            <LetterKey letter='Back' handleBackspace={handleBackspace}/>
        </div>
      </div>
    )
  }

  export default Keyboard;