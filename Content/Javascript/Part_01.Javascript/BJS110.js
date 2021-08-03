// Only change code below this line
function rangeOfNumbers(i, n) {
    if (n < i) {
        return [];
    } else {
        const countArray = rangeOfNumbers(i, n - 1);
        countArray.push(n);
        return countArray;
    }
}

console.log(rangeOfNumbers(1, 5));
// Only change code above this line
