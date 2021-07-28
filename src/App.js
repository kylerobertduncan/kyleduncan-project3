import { useEffect, useState } from 'react';
import firebase from './firebase.js';
import featherIcon from './assets/feather-icon.png';
import GameListings from './GameListings.js';
import SubmitListing from './SubmitListing.js';
import './App.css';

function App() {

  const [ gameList, setGameList ] = useState([]);
  const [ showForm, setShowForm ] = useState(false);

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

  function handleModal() {
      setShowForm(!showForm);
  }

  return (
    <div className="App">
      <header>
        <div className="wrapper">
          <div>
            <img src={featherIcon} alt="feather icon" />
            <h1 onClick={() => window.scrollTo({
              top: 1,
              behavior: 'smooth'
            })}>Folk<span>&amp;</span>Tales</h1>
          </div>
          <button onClick={handleModal}>Add Game</button>
        </div>
      </header>

      <main className="wrapper">
        <GameListings gameList={gameList} />
      </main>

      { showForm ? <SubmitListing handleModal={handleModal}/> : null }

      <footer>
        <div className="wrapper">
          <a href="https://junocollege.com" rel="noopener noreferrer" target="_blank">Made at Juno College</a>
        </div>
      </footer>

    </div>
  );
}

export default App;