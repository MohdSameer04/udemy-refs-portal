import { useRef, useState } from "react";

export default function Player() {
  
  // creating PlayerName ref
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState('');
  

  // this function will call when user click on Set Name button
  function handleClick(){

    // with the help of ref we can use playerName properties in this function also
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = '';
  }


  return (
    <section id="player">

      {/* when we write a player name then show above the line otherwise it will show unknown entity, sending name through conditionally */}
      <h2>Welcome {enteredPlayerName ? enteredPlayerName : 'unknown entity'}</h2>
      
      <p>
        <input
        ref={playerName}
        type="text"  
        />

        {/* when user click on set Name button */}
        <button onClick={handleClick}>Set Name</button>
      
      </p>
    </section>
  );
}
