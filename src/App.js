import { useEffect, useState} from 'react';
import firebase from './firebase.js';
import './App.css';

function App() {

  const [ gameList, setGameList ] = useState([]);
  const [ newListing, setNewListing ] = useState({
      title: "",
      system: "",
      synopsis: "",
      startedBy: ""
    });

  useEffect( () => {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      const newListArray = [];
      const newListData = response.val();
      for (let listing in newListData) {
        newListArray.push({key: listing, info: newListData[listing]})
      }
      setGameList(newListArray);
    })
  }, []);

  const handleChange = (e) => {
    const newListingInput = {...newListing};
    const property = e.target.id;
    const value = e.target.value;
    newListingInput[property] = value;
    setNewListing(newListingInput);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref();
    dbRef.push(newListing);
    setNewListing({
      title: "",
      system: "",
      synopsis: "",
      startedBy: ""
    })
  }

  const handleDelete = (listingID) => {
    const dbRef = firebase.database().ref();
    dbRef.child(listingID).remove();
  }
  
  return (
    <div className="App">
      <header>
        <h1>TTRPG Notice Board</h1>
      </header>

      <main>
        <ul>
          {
            // TRANSFER TO A COMPONENT
            gameList.map( (listItem) => {
              const { title, system, synopsis, startedBy } = listItem.info;
              return(
                <li key={listItem.key}>
                  <h3>{title}</h3>
                  <p className="system">System: {system}</p>
                  <p className="synopsis">{synopsis}</p>
                  <p className="owner">Contact: {startedBy}</p>
                  <button
                    onClick={ () => handleDelete(listItem.key) }
                  >D E L E T E</button>
                </li>
              )
            })
          }
        </ul>
      </main>

      <aside>
        {/* TRANSFER TO A COMPONENT */}
        <h2>Add New Game</h2>
        <form>
          <label htmlFor="title">Game Title:</label>
          <input
            type="text"
            id="title"
            onChange={handleChange}
            value={newListing.title}
          />
          <label htmlFor="system">Game System:</label>
          <input
            type="text"
            id="system"
            onChange={handleChange}
            value={newListing.system}
          />
          <label htmlFor="synopsis">Synopsis:</label>
          <textarea
            id="synopsis"
            cols="30" rows="10"
            onChange={handleChange}
            value={newListing.synopsis}
            ></textarea>
          <label htmlFor="startedBy">Offered By:</label>
          <input
            type="text"
            id="startedBy"
            onChange={handleChange}
            value={newListing.startedBy}
            />
          <button
            type="submit"
            onClick={handleSubmit}
          >Post it!</button>
        </form>
      </aside>

      <footer>
        <p>Made at Juno College</p>
      </footer>
    </div>
  );
}

export default App;