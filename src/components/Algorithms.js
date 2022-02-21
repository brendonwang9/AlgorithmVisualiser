
// function getRandomInt(num) {
//     return Math.floor(Math.random() * num)
// }

// function createNewArray() {
//     var array = []
//     for (let i = 0; i < 100; i++) {
//         array.push(getRandomInt(100))
//     }
//     return array
// }

// var newarray = createNewArray()

// examples :
// var operations = [
//     {
//         idxs: [i, j],
//         action: "compare or swap"
//     },
//     {
//         idxs: [i, height],
//         action: "assign"
//     },
//     {
//         idxs: [i],
//         action: "complete"
//     }
// ]


function bubbleSort(array) {
    // swap on each comparison to bubble largest to top of array
    var operations = []
    for (let j = 1; j <= array.length; j++) {
        var unsortedArrayLength = array.length - j
        for (let i = 0; i < unsortedArrayLength; i++) {
            if (array[i] > array[i + 1]) {
                operations.push({ idxs: [i, i + 1], action: "swap" })
                var temp = array[i]
                array[i] = array[i + 1]
                array[i + 1] = temp
            }
            if (i == unsortedArrayLength - 1) {
                operations.push({ idxs: [unsortedArrayLength, 0], action: "complete" })
            } // last item of unsorted array will be largest 
            else {
                operations.push({ idxs: [i, i + 1], action: "compare" })
            }
        }
    }
    operations.push({ idxs: [0], action: "complete" }) // last item remaining is smallest num
    return operations
}

function selectionSort(array) {
    // swap once after all comparisons finding the largest number
    var operations = []
    for (let j = 1; j < array.length; j++) {
        var maxNumPosition = 0
        var unsortedArrayLength = array.length - j
        for (let i = 1; i <= unsortedArrayLength; i++) {
            operations.push({ idxs: [i, maxNumPosition], action: "compare" })
            if (array[i] > array[maxNumPosition]) {
                maxNumPosition = i
            }
        }
        operations.push({ idxs: [unsortedArrayLength, maxNumPosition], action: "swap" })
        var temp = array[maxNumPosition]
        array[maxNumPosition] = array[unsortedArrayLength]
        array[unsortedArrayLength] = temp
        operations.push({ idxs: [unsortedArrayLength], action: "complete" })
    }
    operations.push({ idxs: [0], action: "complete" })
    return operations
}

function insertionSort(array, operations = []) {
    //assume sublist of 1 item is sorted and insert items into sorted sublist 1 at a time
    // default variable to make shell sort easier
    operations.push({ idxs: [0], action: "complete" })
    for (let i = 1; i < array.length; i++) {
        var insertItemPosition = i
        var insertItemValue = array[i]
        while (insertItemValue < array[insertItemPosition - 1] && insertItemPosition > 0) {
            operations.push({ idxs: [insertItemPosition - 1, insertItemPosition], action: "swap" })
            // memory efficient insertion sort keeps the inserted item as another variable and reassigns the array values as it loops but i use swap because it's easier to see the item move in the visualiser
            array[insertItemPosition] = array[insertItemPosition - 1]
            insertItemPosition--
        }
        array[insertItemPosition] = insertItemValue
        operations.push({ idxs: [insertItemPosition], action: "complete" })
    }
    return operations
}

function shellSort(array) {
    // perform insertion sort on sublists of the array, sublists increase in size each sort until the final insertion sort goes through the whole array. 
    //The final sort will require fewer comparisons as the array is mostly sorted by this point 
    var operations = []
    var noOfSublist = Math.floor(array.length / 2)
    while (noOfSublist > 0) {
        for (let i = 0; i < noOfSublist; i++) {
            gapInsertionSort(array, i, noOfSublist, operations)
        }
        noOfSublist = Math.floor(noOfSublist / 2)
    }
    return operations
}
function gapInsertionSort(array, start, gap, operations) {
    if (gap == 1) { // for the last sort simply use insertion sort so the swap/complete colors dont have to interfere 
        insertionSort(array, operations)
    } else {
        for (let i = start + gap; i < array.length; i = i + gap) {
            var insertItemPosition = i
            var insertItemValue = array[i]
            while (insertItemValue < array[insertItemPosition - gap] && insertItemPosition > 0) {
                operations.push({ idxs: [insertItemPosition - gap, insertItemPosition], action: "swap" })
                array[insertItemPosition] = array[insertItemPosition - gap]
                insertItemPosition = insertItemPosition - gap
            }
            array[insertItemPosition] = insertItemValue
        }
    }
    return array
}

function quickSort(array, first = 0, last = 29) {
    // choose a pivot value and move pivot value to its correct position in array first
    // pivot value aims to divide array into half (smaller than and bigger than halves)
    // divide and conquer similar to merge sort from there 
    if (first < last) {
        var splitIndex = quickSortRecursive(array, first, last)
        quickSort(array, first, splitIndex - 1)
        quickSort(array, splitIndex + 1, last)
    }
    return array
}
function quickSortRecursive(array, first, last) {
    var pivotValue = array[first]
    var leftIndex = first + 1
    var rightIndex = last
    while (leftIndex <= rightIndex) {
        while (pivotValue >= array[leftIndex] && leftIndex <= rightIndex) {
            leftIndex++
        }
        while (array[first] <= array[rightIndex] && leftIndex <= rightIndex) {
            rightIndex--
        }
        if (rightIndex >= leftIndex) {
            var temp = array[leftIndex]
            array[leftIndex] = array[rightIndex]
            array[rightIndex] = temp
        }
    }
    array[first] = array[rightIndex]
    array[rightIndex] = pivotValue
    return rightIndex
}

var splittingCounter = 0
// shouldve split mergesort into a helper function and recursive to make calculating splitcounter easier*
function mergeSort(array, operations = []) {
    // split array at midpoint recursively until all items are in single length arrays (single legnth arrays are sorted by definition) O(log n)
    // * requires significant extra memory for slicing arrays
    // compare (merge) neighbouring arrays to build sorted array O(n)
    if (array.length > 1) {
        var mid = Math.floor(array.length / 2)
        var leftHalf = array.slice(0, mid)
        var rightHalf = array.slice(mid)
        mergeSort(leftHalf, operations)
        mergeSort(rightHalf, operations)
        var iLeft = 0
        var iRight = 0
        var iMerged = 0
        while (iLeft < leftHalf.length && iRight < rightHalf.length) {
            // console.log((splittingCounter - leftHalf.length - rightHalf.length) + " counter on the " + leftHalf)
            if (leftHalf[iLeft] <= rightHalf[iRight]) {
                operations.push({
                    idxs: [
                        splittingCounter - rightHalf.length - leftHalf.length + iMerged,
                        leftHalf[iLeft]
                    ],
                    action: "assign"
                })
                if (array.length == 30) {
                    operations.push({
                        idxs: [
                            splittingCounter - rightHalf.length - leftHalf.length + iMerged
                        ],
                        action: "complete"
                    })
                }
                array[iMerged] = leftHalf[iLeft]
                iLeft++
            } else {
                operations.push({
                    idxs: [
                        splittingCounter - rightHalf.length - leftHalf.length + iMerged,
                        rightHalf[iRight]
                    ],
                    action: "assign"
                })
                if (array.length == 30) {
                    operations.push({
                        idxs: [
                            splittingCounter - rightHalf.length - leftHalf.length + iMerged
                        ],
                        action: "complete"
                    })
                }
                array[iMerged] = rightHalf[iRight]
                iRight++
            }
            iMerged++
        }
        // any items remaining in left/right half are inserted as last item(s) in merged array
        while (iLeft < leftHalf.length) {
            // splittingCounter will tell us how many 1 length arrays exist, so for the very first merge splittingCounter = 2
            // we can subtract left/rightHalf lengths to get the position on the parent array  
            operations.push({
                idxs: [
                    splittingCounter - rightHalf.length - leftHalf.length + iMerged,
                    leftHalf[iLeft]
                ],
                action: "assign"
            })
            if (array.length == 30) {
                operations.push({
                    idxs: [
                        splittingCounter - rightHalf.length - leftHalf.length + iMerged
                    ],
                    action: "complete"
                })
            }
            array[iMerged] = leftHalf[iLeft]
            iLeft++
            iMerged++
        }
        while (iRight < rightHalf.length) {
            operations.push({
                idxs: [
                    splittingCounter - rightHalf.length - leftHalf.length + iMerged,
                    rightHalf[iRight]
                ],
                action: "assign"
            })
            if (array.length == 30) {
                operations.push({
                    idxs: [
                        splittingCounter - rightHalf.length - leftHalf.length + iMerged
                    ],
                    action: "complete"
                })
            }
            array[iMerged] = rightHalf[iRight]
            iRight++
            iMerged++
        }
    } else {
        splittingCounter++
        // this counter increments if the split arrayLengths == 1, and will therefore indicate which position of the parent array we're on
        // the position of the parent array is hard to get because during recursion the parent array is split into smaller arrays and the smaller array indexes do not correspond to the final positions 
    }
    if (splittingCounter == 30 && array.length == 30) {
        splittingCounter = 0 // reset the splittingCounter at the last recursive call
    }
    return operations
}

// merge sort vs quick sort
// quicksort doesn't need extra memory as quicksort is in-place algorithm
// quicksort is dependent on pivot value, choosing midpoint = O(nLogn) (each swap divides array by half), choosing edges = O(n^2) (each swap only moves one item to place)
// mergesort is a stablesort so better for larger data structures
// mergsort  can adapt to linked list/ larger lists easier

var sortingAlgorithms = {
    bubbleSort,
    selectionSort,
    insertionSort,
    shellSort,
    quickSort,
    mergeSort
}

export default sortingAlgorithms