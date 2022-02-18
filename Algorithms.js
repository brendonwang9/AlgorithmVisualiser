function getRandomInt(num) {
    return Math.floor(Math.random() * num)
}

function createNewArray() {
    var array = []
    for (let i = 0; i < 100; i++) {
        array.push(getRandomInt(100))
    }
    return array
}

var newarray = createNewArray()

function bubblesort(array) {
    // swap on each comparison to bubble largest to top of array
    for (let j = 0; j < array.length - 1; j++) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] > array[i + 1]) {
                var temp = array[i]
                array[i] = array[i + 1]
                array[i + 1] = temp
            }
        }
    }
    return array
}

function selectionSort(array) {
    // swap once after all comparisons finding the largest number
    for (let j = 1; j < array.length; j++) {
        var maxNumPosition = 0
        var unsortedArrayLength = array.length - j
        for (let i = 1; i <= unsortedArrayLength; i++) {
            if (array[i] > array[maxNumPosition]) {
                maxNumPosition = i
            }
        }
        var temp = array[maxNumPosition]
        array[maxNumPosition] = array[unsortedArrayLength]
        array[unsortedArrayLength] = temp
    }
    return array
}

function insertionSort(array) {
    //assume sublist of 1 item is sorted and insert items into sorted sublist 1 at a time
    for (i = 1; i < array.length; i++) {
        var insertItemPosition = i
        var insertItemValue = array[i]
        while (insertItemValue < array[insertItemPosition - 1] && insertItemPosition > 0) {
            array[insertItemPosition] = array[insertItemPosition - 1]
            insertItemPosition--
        }
        array[insertItemPosition] = insertItemValue
    }
    return array
}

function shellSort(array) {
    // perform insertion sort on sublists of the array, sublists increase in size each sort until the final insertion sort goes through the whole array. 
    //The final sort will require fewer comparisons as the array is mostly sorted by this point 
    var noOfSublist = Math.floor(array.length / 2)
    while (noOfSublist > 0) {
        for (let i = 0; i < noOfSublist; i++) {
            gapInsertionSort(array, i, noOfSublist)
        }
        noOfSublist = Math.floor(noOfSublist / 2)
    }
    return array
}
function gapInsertionSort(array, start, gap) {
    for (i = start + gap; i < array.length; i = i + gap) {
        var insertItemPosition = i
        var insertItemValue = array[i]
        while (insertItemValue < array[insertItemPosition - gap] && insertItemPosition > 0) {
            array[insertItemPosition] = array[insertItemPosition - gap]
            insertItemPosition = insertItemPosition - gap
        }
        array[insertItemPosition] = insertItemValue
    }
    return array
}

function quickSort(array, first = 0, last = 99) {
    if (first < last) {
        splitIndex = quickSortRecursive(array, first, last)
        quickSort(array, first, splitIndex - 1)
        quickSort(array, splitIndex + 1, last)
    }
    return array
}
function quickSortRecursive(array, first, last) {
    // choose a pivot value and move pivot value to its correct position in array first
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

function mergeSort(array) {
    // split array at midpoint recursively until all items are in single length arrays (single legnth arrays are sorted by definition) O(log n)
    // requires extra memory for slicing arrays
    // compare and merge neighbouring arrays to build sorted array O(n)
    if (array.length > 1) {
        mid = Math.floor(array.length / 2)
        var leftHalf = array.slice(0, mid)
        var rightHalf = array.slice(mid)
        mergeSort(leftHalf)
        mergeSort(rightHalf)

        var iLeft = 0
        var iRight = 0
        var iSorting = 0
        while (iLeft < leftHalf.length && iRight < rightHalf.length) {
            if (leftHalf[iLeft] <= rightHalf[iRight]) {
                array[iSorting] = leftHalf[iLeft]
                iLeft++
            } else {
                array[iSorting] = rightHalf[iRight]
                iRight++
            }
            iSorting++
        }
        while (iLeft < leftHalf.length) {
            array[iSorting] = leftHalf[iLeft]
            iLeft++
            iSorting++
        }
        while (iRight < rightHalf.length) {
            array[iSorting] = rightHalf[iRight]
            iRight++
            iSorting++
        }
    }
    return array
}