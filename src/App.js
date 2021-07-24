import { useEffect, useState} from 'react';
import firebase from './firebase.js';
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
  
  // console.log(gameList);

  return (
    <div className="App">
      <header>
        <h1>TTRPG Notice Board</h1>
      </header>
      <main>
        <ul>
          {
            gameList.map( (listItem) => {
              return(
                <li key={listItem.key}>
                  <h3>{listItem.info.title}</h3>
                  <p className="system">System: {listItem.info.system}</p>
                  <p className="synopsis">{listItem.info.synopsis}</p>
                  <p className="owner">Contact: {listItem.info.startedBy}</p>
                </li>
              )
            })
          }
        </ul>
      </main>
      <aside>
        {/* input form goes here */}
      </aside>
      <footer>
        <p>Made at Juno College</p>
      </footer>
    </div>
  );
}

export default App;
