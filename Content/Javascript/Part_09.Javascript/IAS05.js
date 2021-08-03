function spinalCase(str) {
    return str.split(/\s|_|(?=[A-Z])/).join("-").toLowerCase();
}

console.log(spinalCase('Teletubbies say Eh-oh'))