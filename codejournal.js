// Variables - containers that store values

var name;
// Very similar to C++ variables
// Var is still available but not used much anymore
// This variable has been declared (created) but not initialized (a value set to it)
// It's in the global scope, which is bad. Primary reason we don't use it anymore.

let foo;
// A declared ES variable that can be changed
// Still has not been initialized

const bar = "Bar";
// A declared ES 6 constant that cannot be changed
// '=' is the assignment operator, read it as "is assigned the value of..."

const ANSWER = "42";

//Strings - a set (string) of characters

let string1 = "Hello World!"; // created as a string literal
// Let this variable on the left be assigned this value on the right

let string2 = "Hello Utah!";

let string3 = new String("Hello New World!"); // created using a string constructor

// Numbers

let myNum = 23456789;

let myNum2 = 75.25;

// JS should not be used for really precise math

"1" // is not a number it is a string!

// "==" is called a loose equality check
"1" == 1; // reads as true
// Type coercion - JS is taking the number and treating it as a string, so they read as the same
// "1" + 1 = '11' happens because the two ones are changed into strings and become a string of two ones in a row

// "===" is a strict equality check
"1" === 1; // reads as false because the string is not equal to the number

// Boolean - holds a true or false value

let myBool = true;

// research more into "truthy" and "falsy" values

// Arrays - hold sets of items of any data type

let myArray = []; // this is an empty array - notice the square brackets

let myArray2 = [42, "Bob", myBool, ANSWER, true];
// ordering     0     1      2       3       4

let secondElement = myArray2[1]; // retrieve the second item in the array

myArray2.length; // determine the length of the array

let lastItem = myArray2[myArray2.length - 1]; // using the length to find the last item

// Objects

let minObject = {}; // empty object

let myCar = {
    make: 'Honda',
    model: 'Fit',
    color: 'silver',
    year: '2009'
}
// on the left hand side is the key, the right hand side of the : is the value
// objects consist of key/value pairs that you can access and change

myCar.numDoors = 4; // add a key/value pair to the object

const anotherObject = {
    words: ['foo', 'bar', 'baz'],
    me: {
        hair: 'dyed',
        nose: 'pierced',
        relationship: 'taken',
        is: 'gay'
    },
    randomVariable: true
}

// Functions

function myFunction() { // this is a named function definition
    return "My greeting to you is what I return to you!"; // doesn't do much, just returns a string
}

function sumTwoThings(thing1, thing2) {
    return thing1 + thing2;
}

// Filtering Arrays

const pilots = [
    {
        id: 2,
        name: "Wedge Antilles",
        faction: "Rebels"
    },
    {
        id: 8,
        name: "Cienna Ree",
        faction: "Empire"
    },
    {
        id: 40,
        name: "Iden Versio",
        faction: "Empire"
    },
    {
        id: 66,
        name: "Thane Kyrell",
        faction: "Rebels"
    }
]

// Two different ways to format a filter function for an array
const rebels = pilots.filter(pilot => pilot.faction === "Rebels"); // implicit return
const empire = pilots.filter((pilot) => { // optional parentheses on the parameter that's passed in
    return pilot.faction === "Empire";
})

// Map Function

let filmURLs = [
    "https://swapi.co/api/films/",
    "https://swapi.co/api/films/5/",
    "https://swapi.co/api/films/4/this one is longer...even longer",
    "https://swapi.co/api/films/6/",
    "https: ",
    "https://swapi.co/api/films/1/"
]

// map assigns a new array of the lengths of the items in the filmURLs array
const filmLengths = filmURLs.map(filmURL => filmURL.length)

// map creates a new array of objects using data from the original array
const filmPlusMore = filmURLs.map(filmURL => {
    let filmObj = {
        url: filmURL,
        createdDate: Date.now(),
    }
    return filmObj
})

// map creates a new array of just the names of the pilots from the original array
const pilotNames = filmURLs.map(filmURL => filmURL.name)

// Ternary Operator Syntax
// condition ? exprIfTrue : exprIfFalse