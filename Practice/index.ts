class Employee {
    fullName: String;

    constructor(firstName: String, lastName: String) {
        this.fullName = firstName + " " + lastName;
    }

    greet() {
        console.log("Hi " + this.fullName)
    }
}  

let person1 = new Employee("Bruce", "Wayne");
person1.greet();


interface Person {
    firstName: String;
    lastName: String;
}

function sayMyName(person: Person) {
    return "I'm " + person.firstName + " " + person.lastName;
}

let dude = {firstName: "Evil", lastName: "Morty"}

console.log(sayMyName(dude));

function add(num1: number, num2?: number): number {
    if(num2) {
        return num1 + num2;
    } else {
        return num1;
    }
}

console.log(add(5));
