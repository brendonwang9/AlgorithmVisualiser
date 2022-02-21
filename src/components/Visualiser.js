import "./Visualiser.css"
import sortingAlgorithms from "./Algorithms"

const SPEED = 20
function Visualiser({ array, algorithm }) {
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
    function getAlgorithm(algorithm) {
        var refactorAlgo = algorithm[0].toLowerCase() + algorithm.replace("-", "").slice(1)
        runAlgorithm(sortingAlgorithms[refactorAlgo])
    }
    async function runAlgorithm(sortingFunction) {
        var operations = sortingFunction(array.map(num => num))
        var arrayBars = document.querySelectorAll(".bars")
        console.log(operations)
        for (let i = 0; i < operations.length; i++) {
            // can heavily refactor this
            var [bar1idx, bar2idx] = operations[i].idxs
            var bar1 = arrayBars[bar1idx].style
            if (operations[i].action === "compare") {
                var bar2 = arrayBars[bar2idx].style
                var currentColorB1 = bar1.backgroundColor
                var currentColorB2 = bar1.backgroundColor
                bar1.backgroundColor = "blue"
                bar2.backgroundColor = "blue"
                await sleep(SPEED)
                bar1.backgroundColor = currentColorB1
                bar2.backgroundColor = currentColorB2
            } else if (operations[i].action === "swap") {
                var bar2 = arrayBars[bar2idx].style
                var currentColorB1 = bar1.backgroundColor
                var currentColorB2 = bar1.backgroundColor
                bar1.backgroundColor = "blue"
                bar2.backgroundColor = "blue"
                await sleep(SPEED)
                var temp = bar1.height
                bar1.height = bar2.height
                bar2.height = temp
                await sleep(SPEED)
                bar1.backgroundColor = currentColorB1
                bar2.backgroundColor = currentColorB2
            } else if (operations[i].action === "complete") {
                var [bar1idx] = operations[i].idxs
                var bar1 = arrayBars[bar1idx].style
                bar1.backgroundColor = "green"
            } else if (operations[i].action === "assign") {
                var height = bar2idx + "px"
                bar1.backgroundColor = "blue"
                await sleep(SPEED)
                bar1.height = height
                await sleep(SPEED)
                bar1.backgroundColor = "red"
            }
        }
    }
    function sleep(time) {
        return new Promise((resolve, response) => {
            setTimeout(() => {
                resolve()
            }, time)
        })
    }
    return (
        <>
            <div className="visualiser-container">
                <ArrayBars />
            </div>
            <button onClick={() => getAlgorithm(algorithm)}>run</button>
        </>
    )
}


export default Visualiser 