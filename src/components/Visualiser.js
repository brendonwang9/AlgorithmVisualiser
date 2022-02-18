import "./Visualiser.css"

function Visualiser({ array, setArray }) {
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
    return (
        <div className="visualiser-container">
            <ArrayBars />
        </div>
    )
}



export default Visualiser 