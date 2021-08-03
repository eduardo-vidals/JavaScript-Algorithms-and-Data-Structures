var Person = function(firstAndLast) {
    // Only change code below this line
    // Complete the method below and implement the others similarly
    var arr = firstAndLast.split(' ');
    var firstName = arr[0];
    var lastName = arr[1];
    this.getFullName = function() {
        return firstName + ' ' + lastName;
    };
    this.getFirstName = function() {
        return firstName;
    };
    this.getLastName = function() {
        return lastName;
    };
    this.setFirstName = function(first){
        firstName = first;
    };
    this.setLastName = function(last){
        lastName = last;
    };
    this.setFullName = function(firstAndLast){
        var arr = firstAndLast.split(' ');
        firstName = arr[0];
        lastName = arr[1];
    };
};

var bob = new Person('Bob Ross');
bob.getFullName();