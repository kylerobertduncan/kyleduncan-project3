# RPG Notice Board app
A tiled list of TTRPG that are being planned or played, and some key details about them.

## Minimum Viable Product
The MVP is for a user to be able to add and remove games on the 'notice board' by submitting a form with the name of their game/activity and contact info, that persists via Firebase.

## Pseudocode
[create some dummy data]
e.g.:
  randomIndex#1 {
    title: "A Vale of Veggies",
    system: "Dungeons & Dragons 5e",
    synopsis: "A band of anthropomorphic vegetable outlaws mount a resistance against the oppressive Baron d'Aubergine."
    startedBy: "Kyle"
  ~!~ additional data on stretch ~!~
    minPlayers: 3,
    maxPlayers: 7,
    open: true,
    started: false,
    expectedLength: "6-10 sessions",
    sessionLength: "",
    venue: "Online"
  }

[connect firebase to the app in a component]

### -1-
Display the current list of available games on the page
  -a-
  Set up an empty state (array) that will hold the list of games
  -b-
  Get the data from Firebase
    -i-
    useEffect to retrieve data on page load, adding a listener .on(value, ...
    -ii-
    Store the data in state array
  -c-
  Write JSX that maps the array and puts a tile for each game on the page
    (?) could be a component, send data as props
    -i- assign key at top level

### -2- 
Let the user add new game listings to the database
  -a-
  Add a form with the required fields:
    game & contact
    (strtech: add more fields)
    (stretch: a button for a form modal) X
  -b-
  Capture the users form input(s)
    -i-
    Set up a state object to capture the different form inputs
    -ii-
    Capture change events in each input and store to the state object
    -iii-
    Connect state to form value >> controlled inputs
  -c-
  On submit, push the object to firebase (and therefore to the page)
    -i-
    Clear the form (and close modal)

### -3-
Add a button that lets user delete a game listing from the database
  -a-
  Add a button to the JSX for each tile
  -b-
  Send the key to a handle function
    -i- Write a function that finds the matching object in the database and removes them

## Stretch Goals

### 0.
X Add animation & accesibility to delete buttons
X Move main and & aside into components
X Make the form a modal pop-up
X - Create 'add game' button, toggle display
Import icons for delete buttons?
X Convert main section to grid layout
X Add responsive design
X Add warning catch on delete button
X Add authentication on form fields

#### NEXT
i. Accessibility in SubmitListing modal
  - add 'esc' key option
  X lock keyboard into tab cycle ?? autofocus on render
  
ii. Add second background for small screens?

iii. Experiment with grid to make tiles more economically sized
  - filter gameList on import, based on length of synopsis
  - add a property to those with long entries (35-50+ words?)
  - in gameList.map add a class to the li when "long = true"
  - add a css class that sets grid-column to span 2 (rows?)
  - add the auto-fill dense attribute to the grid

### 1.
Add a prompt at login for userName, and store in state, and autopopulate form name
Add datalist for gameSystem input, populated by existing gameSystem responses
Add more gameObject properties and display
  - make an array of properties that is mapped where required to be generated?

### 2.
X a.  Add a gameObject property, players: [], and add info to each tile;
X b.  Add a button to each tile that adds userName to player array in database;
    i. Have function check against maxPlayers

### 3.
a. Create a new object in Firebase, users: [];
b. On page load prompt, compare userName to users array
  i. On duplicate, confirm ID or refuse name;
  ii. If new, add userName to users array;
c. Add function to remove userName from a particular game player array (add/remove button)

### 4.
Add conditional classes or other visual when game tiles, when min & maxPlayers met, or if game is closed

5.
a. Collect userName & email at page load, add both as object/s to users: [], and store in currentUser state
  ? Research authentication/security for storing emails
  i. Add notify players button on each game that opens an email to all players

### 6.
Search/filter function that can sort or show tiles by categories or other user queries

### 7.
Offer a choice of icons for each new game, to infer genre or vibe (via font-awesome)

### 8.
Add ability (via modal?) for owner to edit the different properties of their listings

### 9.
Custom modal pop-ups for alert, confirm & prompt

## Styling References

### Background SVG
dark blue `#001220`
orange `#FA7268`
red `#C62368`

### Palette Scheme
light grey `#EEEEEE`
dark blue `#222831`
green `#4F8A8B`
yellow `#FBD46D`

### Fonts
MONO: `font-family: 'JetBrains Mono', monospace;`
HEADER: `font-family: 'Ruda', sans-serif;`
BODY/P: `font-family: 'Spartan', sans-serif;`

