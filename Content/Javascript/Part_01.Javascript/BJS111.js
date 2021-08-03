function rangeOfNumbers(startNum, endNum) {
    if (endNum < 1) {
        return [];
    } else {
        const countArray = rangeOfNumbers(endNum - 1);
        countArray.push(endNum);
        return countArray;
    }
}

console.log(rangeOfNumbers(1, 5));