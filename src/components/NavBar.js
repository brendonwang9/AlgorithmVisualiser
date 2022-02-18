// import "NavBar.css"


function NavBar({ array, setArray, algorithm, setAlgorithm }) {
    function getRandomInt(num) {
        return Math.floor(Math.random() * num)
    }
    function newArray() {
        var newArray = []
        for (let i = 0; i < 10; i++) {
            newArray.push(getRandomInt(100))
        }
        console.log("setting newarray")
        setArray(newArray)
    }
    function AlgorithmButtons() {

    }
    return (
        <nav>
            <button onClick={newArray}>New Array</button>
            <AlgorithmButtons />
        </nav>
    )
}

export default NavBar