// import './App.css';
import NavBar from "./components/NavBar.js"
import Visualiser from "./components/Visualiser.js"
import { useState } from "react"

function App() {
  var [array, setArray] = useState([0])
  var [algorithm, setAlgorithm] = useState("Bubble-Sort")
  return (
    <div className="App">
      <header>
        <h1>Algorithm Visualiser</h1>
        <NavBar array={array} setArray={setArray} algorithm={algorithm} setAlgorithm={setAlgorithm} />
      </header>
      <Visualiser array={array} algorithm={algorithm} />
    </div>
  );
}

export default App;
