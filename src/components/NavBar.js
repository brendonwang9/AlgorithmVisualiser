// import "NavBar.css"


function NavBar({ array, setArray, algorithm, setAlgorithm }) {
    function getRandomInt(num) {
        return Math.floor(Math.random() * num)
    }
    function newArray() {
        var newArray = []
        for (let i = 0; i < 30; i++) {
            newArray.push(getRandomInt(100))
        }
        console.log("setting newarray")
        setArray(newArray)
    }
    function AlgorithmButtons() {
        var allAlgorithms = ["Bubble-Sort", "Selection-Sort", "Insertion-Sort", "Shell-Sort", "Quick-Sort", "Merge-Sort"]
        var algorithmButtons = []
        for (let i = 0; i < allAlgorithms.length; i++) {
            algorithmButtons.push(
                <button
                    key={i}
                    onClick={() => setAlgorithm(allAlgorithms[i])}
                >
                    {allAlgorithms[i]}
                </button>
            )
        }
        return algorithmButtons
    }
    return (
        <nav>
            <button onClick={newArray}>New Array</button>
            <div>
                <AlgorithmButtons />
            </div>
        </nav>
    )
}

export default NavBar