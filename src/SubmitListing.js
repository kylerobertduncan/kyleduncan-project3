import { useState } from 'react';
import firebase from './firebase.js';

function SubmitListing() {

  const defaultInputs = {
    title: "",
    system: "",
    synopsis: "",
    startedBy: ""
  }

  const [newListing, setNewListing] = useState({...defaultInputs});

  const handleChange = (e) => {
    const newListingInput = { ...newListing }; // this may not work with more nested objects? e.g. "players: []"
    const property = e.target.id;
    const value = e.target.value;
    newListingInput[property] = value;
    setNewListing(newListingInput);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkFields = { ...newListing }
    let emptyField = false;
    for (let value in checkFields) {
      if (checkFields[value].trim() === "") {
        emptyField = true
      }
    }
    if (emptyField === true) {
      window.alert("Please complete all fields.")
    } else {
      const dbRef = firebase.database().ref();
      dbRef.push(newListing);
      setNewListing(defaultInputs);
    }
  }

  return(
    <form>
      <h2>Add New Game</h2>
      <label htmlFor="title">Game Title:</label>
      <input autoFocus type="text" id="title" onChange={handleChange} value={newListing.title} />
      <label htmlFor="system">Game System:</label>
      <input type="text" id="system" onChange={handleChange} value={newListing.system} />
      <label htmlFor="synopsis">Synopsis:</label>
      <textarea id="synopsis" onChange={handleChange} value={newListing.synopsis} ></textarea>
      <label htmlFor="startedBy">Your name:</label>
      <input type="text" id="startedBy" onChange={handleChange} value={newListing.startedBy} />
      <button type="submit" onClick={handleSubmit}>Post it!</button>
    </form>
  );
}

export default SubmitListing;