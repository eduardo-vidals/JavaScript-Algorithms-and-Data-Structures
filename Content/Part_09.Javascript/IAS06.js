function translatePigLatin(str) {
    let cRegex = /[bcdfghjklmnpqrstvwxyz]+/;
    let vRegex = /[aeiou]+/;
    let found = str.match(cRegex);
    if (str.search(vRegex) === 0) {
        return str += 'way';
    } else if (str.search(cRegex) === 0) {
        let newStr = str.replace(cRegex, '');
        return newStr + found + 'ay';
    }
}

translatePigLatin("consonant");