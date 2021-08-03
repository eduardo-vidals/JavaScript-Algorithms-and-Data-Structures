function whatIsInAName(collection, source) {
    var arr = [];
    // Only change code below this line
    var keys = Object.keys(source);
    arr = collection.filter(function(item) {
        return keys.every(function(key) {
            return item.hasOwnProperty(key) && item[key] === source[key];
        });
    });
    // Only change code above this line
    return arr;
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
