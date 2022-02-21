// examples of return value
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
            if (i === unsortedArrayLength - 1) {
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
    for (let i = 1; i < array.length; i++) {
        var insertItemPosition = i
        var insertItemValue = array[i]
        while (insertItemValue < array[insertItemPosition - 1] && insertItemPosition > 0) {
            operations.push({ idxs: [insertItemPosition, array[insertItemPosition - 1]], action: "assign" })
            array[insertItemPosition] = array[insertItemPosition - 1]
            insertItemPosition--
        }
        operations.push({ idxs: [insertItemPosition, insertItemValue], action: "assign" })
        array[insertItemPosition] = insertItemValue
    }
    // we dont know the final positions of the items until the last round is complete as the final item could be the smallest, moving all other idx + 1
    for (let i = array.length - 1; i >= 0; i--) {
        operations.push({ idxs: [i], action: "complete" })
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
    for (let i = start + gap; i < array.length; i = i + gap) {
        var insertItemPosition = i
        var insertItemValue = array[i]
        while (insertItemValue < array[insertItemPosition - gap] && insertItemPosition > 0) {
            operations.push({ idxs: [insertItemPosition, array[insertItemPosition - gap]], action: "assign" })
            array[insertItemPosition] = array[insertItemPosition - gap]
            insertItemPosition = insertItemPosition - gap
        }
        array[insertItemPosition] = insertItemValue
        operations.push({ idxs: [insertItemPosition, insertItemValue], action: "assign" })
    }
    if (gap === 1) {
        for (let i = array.length - 1; i >= 0; i--) {
            operations.push({ idxs: [i], action: "complete" })
        }
    }
    return array
}

function quickSort(array, first = 0, last = 49, operations = []) {
    // choose a pivot value and move pivot value to its final position in sorted array (quicksort recursive)
    // pivot value divides array into two (smaller than and bigger than halves)
    // ideally, pivot value is the middle value as it will divide array by half with each pivot O(logn)
    // when first > last it means either first/last has already been set as the splitindex pivotvalue and is already sorted in place 
    if (first < last) {
        var splitIndex = quickSortRecursive(array, first, last, operations)
        quickSort(array, first, splitIndex - 1, operations)
        quickSort(array, splitIndex + 1, last, operations)
    }
    // in cases where first == last the item array has a length of 1 which is assumed to be sorted in its correct position
    // we must account for this assumption in our visualiser to complete color
    if (first === last) {
        operations.push({ idxs: [first], action: "complete" })
    }
    return operations
}
function quickSortRecursive(array, first, last, operations) {
    var pivotValue = array[first]
    var leftIndex = first + 1
    var rightIndex = last
    while (leftIndex <= rightIndex) {
        // increment left/right index so that (leftvalues < pivotvalue < rightvalues)
        while (pivotValue >= array[leftIndex] && leftIndex <= rightIndex) {
            operations.push({ idxs: [first, leftIndex], action: "compare" })
            leftIndex++
        }
        while (array[first] <= array[rightIndex] && leftIndex <= rightIndex) {
            operations.push({ idxs: [first, rightIndex], action: "compare" })
            rightIndex--
        }
        // swap left/right values if they are in the wrong order 
        if (rightIndex >= leftIndex) {
            operations.push({ idxs: [leftIndex, rightIndex], action: "swap" })
            var temp = array[leftIndex]
            array[leftIndex] = array[rightIndex]
            array[rightIndex] = temp
        }
    }
    //if all items are in the correct left/right halves, indexes will cross at the index that pivotvalue should be placed 
    operations.push({ idxs: [first, rightIndex], action: "swap" })
    array[first] = array[rightIndex]
    array[rightIndex] = pivotValue
    operations.push({ idxs: [rightIndex], action: "complete" })
    return rightIndex
}

var splittingCounter = 0
// should split mergesort into a helper function and recursive to make calculating splitcounter easier*
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
            if (leftHalf[iLeft] <= rightHalf[iRight]) {
                operations.push({
                    idxs: [
                        splittingCounter - rightHalf.length - leftHalf.length + iMerged,
                        leftHalf[iLeft]
                    ],
                    action: "assign"
                })
                if (array.length === 50) {
                    operations.push({
                        idxs: [
                            splittingCounter - rightHalf.length - leftHalf.length + iMerged
                        ],
                        action: "complete"
                    })
                } else {

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
                if (array.length === 50) {
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
            if (array.length === 50) {
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
            if (array.length === 50) {
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
        console.log(splittingCounter)
        // this counter increments if the split arrayLengths == 1, and will therefore indicate which position of the parent array we're on
        // the position of the parent array is hard to get because during recursion the parent array is split into smaller arrays and the smaller array indexes do not correspond to the final positions 
    }
    if (splittingCounter === 50 && array.length === 50) {
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