declare class Index {
    firstName: String;
    lastName: String;
    fullName: String;
    constructor(firstName: String, lastName: String);
}
interface Person {
    firstName: String;
    lastName: String;
}
declare function sayMyName(person: Person): string;
declare let user: {
    firstName: string;
    lastName: string;
};
