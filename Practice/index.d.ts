declare class Employee {
    fullName: String;
    constructor(firstName: String, lastName: String);
    greet(): void;
}
declare let person1: Employee;
interface Person {
    firstName: String;
    lastName: String;
}
declare function sayMyName(person: Person): string;
declare let dude: {
    firstName: string;
    lastName: string;
};
declare function add(num1: number, num2?: number): number;
