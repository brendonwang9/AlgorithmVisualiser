function runAnimations(sortingFn, animations) {
    if (sortingFn.name === "bubbleSort") {
        console.log(animations)
    } else if (sortingFn.name === "selectionSort") {
        console.log("selection sorting")
    }
}


export default runAnimations