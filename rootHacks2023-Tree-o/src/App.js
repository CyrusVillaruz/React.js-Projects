import React, { useState } from "react";
import BinaryTree from "./components/BinaryTree";
import TextBox from "./components/TextBox";
import "./styles.css";

function App() {
  const [nodes, setNodes] = useState([]);
  const handleInsert = (value) => {
    setNodes([...nodes, value]);
  };

  return (
    <div className="App">
      {/* <img src="https://dummyimage.com/600x200/000/fff"></img> */}
      {/* <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> */}
      <TextBox onInsert={handleInsert} />
      <BinaryTree nodes={nodes} />
    </div>
  );
}

export default App;
