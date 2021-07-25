import { useEffect, useState } from 'react';
import firebase from './firebase.js';
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

      <aside className={showForm ? "" : "hidden"}>
        <SubmitListing />
      </aside>

      <header>
        <div className="bannerFlex wrapper">
          <h1>TTRPG Notice Board</h1>
          <button
          onClick={handleModal}
          >Add Game</button>
        </div>
      </header>

      <main className="wrapper">
        <ul>
          {
            gameList.map( (listItem) => {
              return(
                <GameListings details={listItem} key={listItem.key} />
              )
            })
          }
        </ul>
      </main>


      <footer>
        <div className="bannerFlex wrapper">
          <div></div>
          <a href="https://junocollege.com">Made at Juno College</a></div>
      </footer>

    </div>
  );
}

export default App;