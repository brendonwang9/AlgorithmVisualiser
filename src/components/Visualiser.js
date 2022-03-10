import "./Visualiser.css"
import sortingAlgorithms from "./Algorithms"

function Visualiser({ array, algorithm, speed, size }) {
    const SPEED = 51 - speed
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
    function OperationCount(numOperations) {
        var p = document.querySelector(".operationCount")
        p.textContent = `Operation Count: ${numOperations}`
    }
    function getAlgorithm(algorithm) {
        var refactorAlgo = algorithm[0].toLowerCase() + algorithm.replace("-", "").slice(1)
        runAlgorithm(sortingAlgorithms[refactorAlgo])
    }
    function runAlgorithm(sortingFunction) {
        var operations = []
        if (sortingFunction.name == "quickSort") {
            var arraySize = Number(size) - 1
            operations = sortingFunction(array.map(num => num), 0, arraySize)
        } else if (sortingFunction.name == "mergeSort") {
            var arraySize = Number(size)
            console.log(arraySize)
            operations = sortingFunction(array.map(num => num), arraySize)
        } else {
            var operations = sortingFunction(array.map(num => num))
        }
        animator(operations)
    }
    async function animator(operations) {
        OperationCount(operations.length)
        var arrayBars = document.querySelectorAll(".bars")
        console.log(operations)
        for (let i = 0; i < operations.length; i++) {
            var [bar1idx, bar2idx] = operations[i].idxs
            var bar1 = arrayBars[bar1idx]
            var currentColorB1 = bar1.style.backgroundColor
            if (operations[i].action != "assign") {
                var bar2 = arrayBars[bar2idx]
                var currentColorB2 = bar2.style.backgroundColor
            } // during assign operator bar2idx == height value not index
            if (operations[i].action === "compare") {
                bar1.style.backgroundColor = "blue"
                bar2.style.backgroundColor = "blue"
                await sleep(SPEED)
                bar1.style.backgroundColor = currentColorB1
                bar2.style.backgroundColor = currentColorB2
            } else if (operations[i].action === "swap") {
                bar1.style.backgroundColor = "blue"
                bar2.style.backgroundColor = "blue"
                await sleep(SPEED)
                var temp = bar1.style.height
                bar1.style.height = bar2.style.height
                bar1.textContent = bar1.style.height.slice(0, -2)
                bar2.style.height = temp
                bar2.textContent = bar2.style.height.slice(0, -2)
                await sleep(SPEED)
                bar1.style.backgroundColor = currentColorB1
                bar2.style.backgroundColor = currentColorB2
            } else if (operations[i].action === "assign") {
                var height = bar2idx + "px"
                bar1.style.backgroundColor = "blue"
                await sleep(SPEED)
                bar1.style.height = height
                bar1.textContent = bar1.style.height.slice(0, -2)
                await sleep(SPEED)
                bar1.style.backgroundColor = currentColorB1
            } else if (operations[i].action === "complete") {
                bar1.style.backgroundColor = "blue"
                await sleep(SPEED)
                bar1.style.backgroundColor = "green"
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
            <button onClick={() => getAlgorithm(algorithm)}>Visualise!</button>
            <p className="operationCount">
                Operation Count: -
            </p>
        </>
    )
}


export default Visualiser 