export default function Sliders({ speed, setSpeed, size, setSize }) {
    function onSetSize(event) {
        setSize(event.target.value)
    }
    function onSetSpeed(event) {
        setSpeed(event.target.value)
    }
    return (
        <div>
            <span>
                Speed
            </span>
            <input
                onChange={onSetSpeed}
                type="range"
                min="5"
                max='50'
                step="5"
                value={speed}
            />
            <span>
                Size
            </span>
            <input
                onChange={onSetSize}
                type="range"
                min="10"
                max='100'
                step="10"
                value={size}
            />
        </div>
    )
}