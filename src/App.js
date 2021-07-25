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

  useEffect( () => {
    // console.log('gameList was re-rendered');
    setShowForm(false);
  }, [gameList])

  function handleModal() {
      setShowForm(!showForm);
  }

  function closeModal(e) {
    console.log(e);
    const click = e.target.nodeName;
    if (click == "ASIDE") {
      handleModal();
    }
  }

  return (
    <div className="App">

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

      <aside className={showForm ? "" : "hidden"}
        onDoubleClick={closeModal}
      >
        <SubmitListing />
        <button className="closeFormButton"
          onClick={handleModal}
        >X</button>
      </aside>

      <footer>
        <div className="bannerFlex wrapper">
          <div></div>
          <a href="https://junocollege.com" rel="noopener noreferrrer" target="_blank">Made at Juno College</a></div>
      </footer>

    </div>
  );
}

export default App;