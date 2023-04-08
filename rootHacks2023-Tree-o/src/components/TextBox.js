import React, { useRef, useState } from "react";

function TextBox({ onInsert }) {
  const [clicks, setClicks] = useState(0);

  const treeStates = {
    state0: 'img/sapling.png',
    state1: 'img/tree0.png',
    state2: 'img/tree1.png',
    state3: 'img/tree2.png',
    state4: 'img/tree3.png',
    state5: 'img/tree4.png',
    state6: 'img/tree5.png',
  };

  const getImageSource = () => {
    if (clicks >= 5 && clicks < 10) {
      return treeStates.state1;
    } else if (clicks >= 10 && clicks < 15) {
      return treeStates.state2;
    } else if (clicks >= 15 && clicks < 20) {
      return treeStates.state3;
    } else if (clicks >= 20 && clicks < 25) {
      return treeStates.state4;
    } else if (clicks >= 25 && clicks < 30) {
      return treeStates.state5;
    } else if (clicks >= 30) {
      return treeStates.state6;
    } else {
      return treeStates.state0;
    }
  };

  const handleInsert = () => {
    const rand = Math.floor(Math.random() * 256) + 1;
    const perfectSquare = rand * rand;
    setClicks(clicks + 1);
    onInsert(perfectSquare);
    const button = document.querySelector('#seedButton');
    button.innerText = "Grow the tree!";
  };

  return (
      <div>
        <button id='seedButton' onClick={handleInsert}>Plant the seed!</button>
        <img src={getImageSource()} alt="Tree" />
      </div>
  );
}

export default TextBox;
