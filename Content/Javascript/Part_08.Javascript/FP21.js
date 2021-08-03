// Only change code below this line
function urlSlug(title) {
    var arr = title.trim().toLowerCase().split(/\W+/);
    return arr.join("-");
}
// Only change code above this line
console.log(urlSlug(" Winter Is  Coming"));
