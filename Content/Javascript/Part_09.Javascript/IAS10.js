function uniteUnique(arr) {
    return [].concat.apply([], arguments).filter(function (elem, index, self) {
        return self.indexOf(elem) === index;
    });
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);