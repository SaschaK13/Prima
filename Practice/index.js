"use strict";
class Index {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + "" + lastName;
    }
}
function sayMyName(person) {
    return "Hello " + person.firstName + " " + person.lastName;
}
let user = { firstName: "Sascha", lastName: "Kay" };
console.log(sayMyName(user));
//# sourceMappingURL=index.js.map