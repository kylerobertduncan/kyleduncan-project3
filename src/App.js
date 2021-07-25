import { useEffect, useState } from 'react';
import firebase from './firebase.js';
import GameListings from './GameListings.js';
import SubmitListing from './SubmitListing.js';
import './App.css';

function App() {

  const [ gameList, setGameList ] = useState([]);

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

  return (
    <div className="App">

      <header>
        <div className="bannerFlex wrapper">
          <h1>TTRPG Notice Board</h1>
          <button>Add Game</button>
        </div>
      </header>

      <div className="mainFlex wrapper">

        <main>
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

        <aside>
          <SubmitListing />
        </aside>

      </div>

      <footer>
        <div className="bannerFlex wrapper">
          <div></div>
          <a href="https://junocollege.com">Made at Juno College</a></div>
      </footer>

    </div>
  );
}

export default App;