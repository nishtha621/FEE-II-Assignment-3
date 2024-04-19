import React, { useState, useEffect } from 'react';
import './Input.css';
import Header from './Header';

const App = () => {
  const NOTES_KEY = 'my-notes'; 
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(NOTES_KEY));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddNote = () => {
    if (inputValue.trim() !== '') {
      setNotes([...notes, inputValue]);
      setInputValue('');
      localStorage.setItem(NOTES_KEY, JSON.stringify([...notes, inputValue]));
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    localStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
  };

  return (
    <>
      <div className='header'>
        <Header/>
      </div>
      <h4>Write a new note here...</h4>

      <div className="container">
        <div className="input-container">
          <input
            className="note-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your note"
          />
          <button className="add-button" onClick={handleAddNote}>Add Note</button>
        </div>
        <ul className="notes-list">
          {notes.map((note, index) => (
            <li className="note-item" key={index}>
              <div></div><span className='inp'>{note}</span>
              <button className="delete-button" onClick={() => handleDeleteNote(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
