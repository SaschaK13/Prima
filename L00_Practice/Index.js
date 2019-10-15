"use strict";
class Employee {
    constructor(firstName, lastName) {
        this.fullName = firstName + " " + lastName;
    }
    greet() {
        console.log("Hi " + this.fullName);
    }
}
let person1 = new Employee("Bruce", "Wayne");
person1.greet();
function sayMyName(person) {
    return "I'm " + person.firstName + " " + person.lastName;
}
let dude = { firstName: "Evil", lastName: "Morty" };
console.log(sayMyName(dude));
function add(num1, num2) {
    if (num2) {
        return num1 + num2;
    }
    else {
        return num1;
    }
}
console.log(add(5));
//# sourceMappingURL=Index.js.map