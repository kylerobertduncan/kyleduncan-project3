import firebase from './firebase.js';

function GameListings(props) {

  const handleDelete = (listingID) => {
    const dbRef = firebase.database().ref();
    dbRef.child(listingID).remove();
  }

  const { title, system, synopsis, startedBy } = props.details.info;
  return (
    <li tabIndex="0">
      <h3>{title}</h3>
      <p className="system">{system}</p>
      <p className="synopsis">{synopsis}</p>
      <p className="startedBy">To play, contact {startedBy}</p>
      <button
        onClick={() => handleDelete(props.details.key)}
      >X</button>
    </li>
  );

}

export default GameListings;