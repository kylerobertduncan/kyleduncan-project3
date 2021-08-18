import { useState } from 'react';
import firebase from './firebase.js';

function SubmitListing(props) {
  const { handleModal } = props;

  const defaultInputs = {
    title: "",
    system: "",
    synopsis: "",
    startedBy: "",
    minPlayers: 2,
    maxPlayers: 6,
    campaignLength: "",
    sessionLength: "",
    venue: "",
    open: true,
    started: false,
  }

  const [newListing, setNewListing] = useState({...defaultInputs});

  // closes SubmitListing modal on double click in aside
  function closeModal(e) {
    const click = e.target.nodeName;
    if (click === "ASIDE") {
      handleModal();
    }
  }

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
      // if (checkFields[value].trim() === "") {
      if (checkFields[value] === "") {
        emptyField = true
      }
    }
    if (emptyField === true) {
      window.alert("Please complete all fields.")
    } else {
      const dbRef = firebase.database().ref();
      dbRef.push(newListing);
      setNewListing(defaultInputs);
      handleModal();
    }
  }

  return(
    <aside onDoubleClick={closeModal}>
      <form>
        <h2>Add New Game</h2>
        <div className="formFlex">
          <label htmlFor="title">Game Title:</label>
          <input autoFocus type="text" id="title" onChange={handleChange} value={newListing.title} />
          <label htmlFor="system">Game System:</label>
          <input type="text" id="system" onChange={handleChange} value={newListing.system} />
          <label htmlFor="synopsis">Synopsis:</label>
          <textarea id="synopsis" onChange={handleChange} value={newListing.synopsis} ></textarea>
          <label htmlFor="startedBy">Your name:</label>
          <input type="text" id="startedBy" onChange={handleChange} value={newListing.startedBy} />
          
          {/* <div className="playerCount">
            <label htmlFor="minPlayers">Min. Players</label>
            <input type="number" id="minPlayers" min="1" onChange={handleChange} value={newListing.minPlayers} />
            <label htmlFor="maxPlayers">Max. Players</label>
            <input type="number" id="maxPlayers" onChange={handleChange} value={newListing.maxPlayers} />
          </div>
          <label htmlFor="campaignLength">Campaign Length:</label>
          <input type="text" id="campaignLength" onChange={handleChange} value={newListing.campaignLength} />
          <label htmlFor="sessionLength">Session Length:</label>
          <input type="text" id="sessionLength" onChange={handleChange} value={newListing.sessionLength} />
          <label htmlFor="venue">Venue:</label>
          <input type="text" id="venue" onChange={handleChange} value={newListing.venue} />
          <div className="gameProgress">
            <label htmlFor="open">Open to players:</label>
            <input type="checkbox" id="open" />
            <label htmlFor="started">Game already started:</label>
            <input type="checkbox" id="started" />
          </div> */}
        </div>

        <button type="submit" onClick={handleSubmit}>Post it!</button>
        <button aria-label="Cancel new listing" className="closeFormButton" onClick={handleModal}>X</button>
      </form>
    </aside>
  );
}

export default SubmitListing;