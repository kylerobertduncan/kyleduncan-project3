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
    location: "",
    open: true,
    started: false,
    size: "",
    dateAdded: "",
    required: [ "title", "synopsis", "startedBy" ]
    // handles string values only
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
    const newListingInput = { ...newListing };
    const property = e.target.id;
    const value = e.target.value;
    newListingInput[property] = value;
    setNewListing(newListingInput);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // check for empty fields in the listing
    let emptyField = false;
    for (let value in newListing.required) {
      const stringToCheck = newListing[newListing.required[value]];
      if (stringToCheck.trim() === "") {
        emptyField = true;
      }
    }
    if (emptyField === true) {
      window.alert("Please complete required fields.")
    } else {
      // set the lengthValue
      const testLength = newListing.synopsis.split(' ').length;
      if (testLength > 50) {
        const newListingInput = { ...newListing };
        newListingInput.size = "long";
        setNewListing(newListingInput);
      } else if (testLength > 25) {
        const newListingInput = { ...newListing };
        newListingInput.size = "medium";
        setNewListing(newListingInput);
      }
      // send the listing to firebase
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

          <div className="flexColumn">

            <label htmlFor="title">Game Title: *</label>
            <input autoFocus type="text" id="title" onChange={handleChange} value={newListing.title} placeholder="required"/>

            <label htmlFor="system">Game System:</label>
            <input type="text" id="system" onChange={handleChange} value={newListing.system}/>

            <label htmlFor="synopsis">Synopsis: *</label>
            <textarea id="synopsis" onChange={handleChange} value={newListing.synopsis} placeholder="required"></textarea>

            <label htmlFor="startedBy">Your name: *</label>
            <input type="text" id="startedBy" onChange={handleChange} value={newListing.startedBy} placeholder="required"/>

          </div>
          
          <div className="flexColumn">

            <fieldset className="playerCount">
              <legend>Number of Players</legend>
              <div>
                <label htmlFor="minPlayers">Min.</label>
                <input type="number" id="minPlayers" min="1" onChange={handleChange} value={newListing.minPlayers} />
              </div>
              <div>
                <label htmlFor="maxPlayers">Max.</label>
                <input type="number" id="maxPlayers" onChange={handleChange} value={newListing.maxPlayers} />
              </div>
            </fieldset>

            <div className="campaignLengthDiv formDiv">
              <label htmlFor="campaignLength">Campaign Length:</label>
              <select id="campaignLength" onChange={handleChange} value={newListing.campaignLength}
              >
                <option value="" defaultValue disabled>Choose One</option>
                <option value="1-2 sessions">One Shot: 1-2 sessions</option>
                <option value="3-5 sessions">Short: 3-5 sessions</option>
                <option value="5-10 sessions">Medium: 5-10 sessions</option>
                <option value="10+ sessions">Long: 10+ sessions</option>
              </select>
            </div>

            <div className="sessionLengthDiv formDiv">
              <label htmlFor="sessionLength">Session Length:</label>
              <input type="text" id="sessionLength" onChange={handleChange} value={newListing.sessionLength} />
            </div>

            <div className="locationDiv formDiv">
              <label htmlFor="location">Location/Platform:</label>
              <input type="text" id="location" onChange={handleChange} value={newListing.location} />
            </div>

            <div className="gameProgress">
              <div className="openDiv">
                <label htmlFor="open">Open to players:</label>
                <input type="checkbox" id="open" />
              </div>
              <div className="startedDiv">
                <label htmlFor="started">Game started:</label>
                <input type="checkbox" id="started" />
              </div>
            </div>

            <button type="submit" onClick={handleSubmit}>Post it!</button>

          </div>

        </div>
        <button aria-label="Cancel new listing" className="closeFormButton" onClick={handleModal}>X</button>
      </form>
    </aside>
  );
}

export default SubmitListing;