import firebase from './firebase.js';
import featherIcon from './assets/feather-icon.png';

function GameListings(props) {
  const { gameList } = props;

  const handleJoinGame = (listingID) => {
    const newPlayer = window.prompt("Enter your name to join this game:");
    // check the string has content
    if (newPlayer.trim() !== "") {
      // match the selected game to the listed data
      const thisGame = gameList.filter( listing => listing.key === listingID );
      // if there are existing players, add to that array
      if (thisGame[0].info.players) {
        const players = {
          players: [...thisGame[0].info.players, newPlayer]
        };
        const dbRef = firebase.database().ref();
        dbRef.child(listingID).update(players);
      // it not, start a new array
      } else {
        const players = {
          players: [newPlayer]
        };
        const dbRef = firebase.database().ref();
        dbRef.child(listingID).update(players);
      }
    } else {
      window.alert("Please enter a name to join.")
    }
  }

  const handleDelete = (listingID) => {
    const confirm = window.confirm("This will permanently delete the listing. Would you like to continue?");
    if (confirm === true) {
      const dbRef = firebase.database().ref();
      dbRef.child(listingID).remove();
    }
  }
  
  return (
    <ul>
      {
        gameList.map( (listItem) => {
          const { long, players, system, synopsis, startedBy, title } = listItem.info;
          // console.log(long);
          let divClass;
          if (long) {
            divClass = "listing long"
          } else {
            divClass = "listing"
          }
          return(
            <div className={divClass} key={listItem.key} tabIndex="0" >
              <li>
                <h3>{title}</h3>
                <p className="system">{system}</p>
                <p className="synopsis">{synopsis}</p>
                <p className="startedBy">To play, contact {startedBy}</p>
                <p className="players">Players: { players ? players.join(', ') : "sign up to play!"}</p>
              </li>
              <button
                aria-label={`Join ${title}`}
                className="joinGame"
                onClick={() => handleJoinGame(listItem.key)}
                title="Join the game!"
              ><img src={featherIcon} alt={`Join ${title}`}/></button>
              <button
                aria-label={`Delete ${title} listing`}
                className="removeListing"
                onClick={() => handleDelete(listItem.key)}
                title="Delete this listing"
              >X</button>
            </div>
          )
        })
      }
    </ul>
    
  );

}

export default GameListings;