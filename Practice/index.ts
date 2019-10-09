class Index {
    fullName: String;
    constructor(public firstName: String, public lastName: String) {
        this.fullName = firstName + "" + lastName;
    }
}  

interface Person {
    firstName: String;
    lastName: String;
}

function sayMyName(person: Person) {
    return "Hello " + person.firstName + " " + person.lastName;
}

let user = {firstName: "Sascha", lastName: "Kay"}

console.log(sayMyName(user));