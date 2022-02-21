import './App.css';
import NavBar from "./components/NavBar.js"
import Visualiser from "./components/Visualiser.js"
import Sliders from "./components/Sliders.js"
import { useState } from "react"

function App() {
  var [array, setArray] = useState([0])
  var [algorithm, setAlgorithm] = useState("Bubble-Sort")
  var [speed, setSpeed] = useState("25")
  var [size, setSize] = useState("50")
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Serif:wght@200&display=swap" rel="stylesheet"></link>
      <header>
        <h1>Sorting Algorithm Visualiser</h1>
        <NavBar size={size} setArray={setArray} setAlgorithm={setAlgorithm} />
      </header>
      <br></br>
      <div>
        <p> Sorting with {algorithm}</p>
        <Visualiser array={array} algorithm={algorithm} speed={speed} size={size} />
        <Sliders speed={speed} setSpeed={setSpeed} size={size} setSize={setSize} />
      </div>
    </div>
  );
}

export default App;
