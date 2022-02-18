import "./Visualiser.css"
import sortingAlgorithms from "./Algorithms"
import { useEffect } from "react"

function Visualiser({ array, setArray, algorithm, setAlgorithm }) {
    function ArrayBars() {
        var divArray = []
        for (let i = 0; i < array.length; i++) {
            divArray.push(
                <div key={i} className="bars">
                    {array[i]}
                </div>
            )
        }
        return divArray
    }
    useEffect(() => {
        console.log("effects")
        ArrayBars()
    }, [array])
    function runAlgorithm(algorithm) {
        var refactorAlgo = algorithm[0].toLowerCase() + algorithm.replace("-", "").slice(1)
        sort(sortingAlgorithms[refactorAlgo])
    }
    function sort(sortingFunction) {
        console.log(`sorting with ${sortingFunction}`)
        var sortedArray = sortingFunction(array)
        console.log(sortedArray)
        return () => setArray(sortedArray)
    }
    return (
        <div className="visualiser-container">
            <ArrayBars />
            <button onClick={() => runAlgorithm(algorithm)}>run</button>
        </div>
    )
}



export default Visualiser 