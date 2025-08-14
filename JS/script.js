// Variables and Data Types
let greeting = "Hello, World!";
const pi = 3.14159;
let isActive = true;

// Console logging
console.log("Welcome to JavaScript!");
console.log("Greeting:", greeting);

// Basic function declaration
function sayHello(name) {
    return `Hello, ${name}!`;
}

// Arrow function example
const add = (a, b) => a + b;

// Working with arrays
const fruits = ['apple', 'banana', 'orange'];
fruits.forEach(fruit => console.log(fruit));

// Object example
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
};

// Event listener example
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is ready!');
    
    // Example of selecting elements
    const button = document.querySelector('#myButton');
    const textElement = document.querySelector('#textElement');
    
    // Adding click event listener
    if (button) {
        button.addEventListener('click', function() {
            alert('Button clicked!');
        });
    }
});

// Simple counter example
let counter = 0;
function incrementCounter() {
    counter++;
    console.log('Counter value:', counter);
}

// Basic error handling
try {
    // Some code that might throw an error
    const result = someFunction();
} catch (error) {
    console.error('An error occurred:', error.message);
}

// Working with timing functions
setTimeout(() => {
    console.log('This message appears after 2 seconds');
}, 2000);

// Basic DOM manipulation functions
function updateText(elementId, newText) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = newText;
    }
}

function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
}

// Example of using fetch API
function fetchData() {
    fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(data => console.log('Data:', data))
        .catch(error => console.error('Error:', error));
}