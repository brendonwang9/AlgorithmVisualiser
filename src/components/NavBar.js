import "./NavBar.css"


function NavBar({ size, setArray, setAlgorithm }) {
    function getRandomInt(num) {
        return Math.floor(Math.random() * num)
    }
    function newArray() {
        var newArray = []
        for (let i = 0; i < size; i++) {
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
            <AlgorithmButtons />
        </nav>
    )
}

export default NavBar