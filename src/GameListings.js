import firebase from './firebase.js';

function GameListings(props) {
  const { gameList } = props;

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
          const { system, synopsis, startedBy, title } = listItem.info;
          return(
            <li key={listItem.key} tabIndex="0">
              <h3>{title}</h3>
              <p className="system">{system}</p>
              <p className="synopsis">{synopsis}</p>
              <p className="startedBy">To play, contact {startedBy}</p>
              <button
                onClick={() => handleDelete(listItem.key)}
                aria-label="Delete listing"
              >X</button>
            </li>
          )
        })
      }
    </ul>
    
  );

}

export default GameListings;