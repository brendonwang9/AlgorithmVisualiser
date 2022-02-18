import "./Visualiser.css"
import sortingAlgorithms from "./Algorithms"
// import { useEffect } from "react"

function Visualiser({ array, setArray, algorithm }) {
    function ArrayBars() {
        var divArray = []
        for (let i = 0; i < array.length; i++) {
            divArray.push(
                <div
                    key={i}
                    className="bars"
                    style={{
                        background: "red",
                        height: `${array[i]}px`
                    }}
                >
                    {array[i]}
                </div>
            )
        }
        return divArray
    }
    // useEffect(() => {
    //     console.log("effects")
    //     ArrayBars()
    // }, [array])
    function runAlgorithm(algorithm) {
        var refactorAlgo = algorithm[0].toLowerCase() + algorithm.replace("-", "").slice(1)
        sort(sortingAlgorithms[refactorAlgo])
    }
    function sort(sortingFunction) {
        var sortedArray = sortingFunction(array).map(num => num)
        setArray(sortedArray)
    }
    return (
        <>
            <div className="visualiser-container">
                <ArrayBars />
            </div>
            <button onClick={() => runAlgorithm(algorithm)}>run</button>
        </>
    )
}



export default Visualiser 