import firebase from './firebase.js';
import featherIcon from './assets/feather-icon.png';

function GameListings(props) {
  const { gameList } = props;

  const createPlayerList = (listingID) => {
    console.log(gameList);
    console.log(listingID);
    // get the firebase listing object by the listing ID
    // get the array of player names for that listing
    // convert that array into a string ("name, name, name")
    // return that string for the listing
  }
  const playerListID = "-MgBbyAgzauyw87xKu2z"
  createPlayerList(playerListID);

  const handleJoinGame = (listingID) => {
    const newPlayer = window.prompt("Enter your name to join this game:");
    if (newPlayer.concat() !== "") {
      const thisGame = gameList.filter( listing => listing.key === listingID );
      const players = {
        players: [...thisGame[0].info.players, newPlayer]
      };
      const dbRef = firebase.database().ref();
      dbRef.child(listingID).update(players);
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
          const { players, system, synopsis, startedBy, title } = listItem.info;
          console.log(players);
          return(
            <li key={listItem.key} tabIndex="0">
              <h3>{title}</h3>
              <p className="system">{system}</p>
              <p className="synopsis">{synopsis}</p>
              <p className="startedBy">To play, contact {startedBy}</p>
              <p className="players">Players: { players ? players.join(', ') : "sign up to play!"}</p>
              {/* <p className="players">Players: {
                players.map( (player, index) => {
                  if (index > players.length) {
                    return (`${player}, `)
                  } else {
                    return (player)
                  }
                })
              }</p> */}
              <button
                className="joinGame"
                onClick={() => handleJoinGame(listItem.key)}
                aria-label={`Join ${title}`}
              ><img src={featherIcon} alt={`Join ${title}`}/></button>
              <button
                className="removeListing"
                onClick={() => handleDelete(listItem.key)}
                aria-label={`Delete ${title} listing`}
              >X</button>
            </li>
          )
        })
      }
    </ul>
    
  );

}

export default GameListings;