# JavaScript Algorithms and Data Structures
A collection of projects designed to be a guide for the fundamental concepts of JavaScript algorithms and Data Structures.

## Summary of Projects:

- [Palindrome Checker](#1-palindrome-checker)
- [Roman Numeral Converter](#2-roman-numeral-converter)
- [Telephone Number Validator](#3-telephone-number-validator)
- [Cash Register](#4-cash-register)
- [Pokemon Search App](#5-pokemon-search-app)

### 1. Palindrome Checker:
Checks if a word or phrase is a palindrome (reads the same backward as forward). By recieving input from a web page, this project compares the reversed version with the original to decide if it's a palindrome. The result is then displayed on the page.
#### Functions:
* `checker()`: Function for checking if a given input (word or phrase) is a palindrome
* `removePunctuation(text)`: Helper function that removes punctuation and spaces from the input text

<hr />

### 2. Roman Numeral Converter:
Converts decimal numbers (0-3999) into Roman numerals. After recieving input from the web page, the converter() function to performs the conversion. Elements are displayed using D3.
#### Functions:
* `checker()`: Takes a number as input, validates it, and uses the `converter()` function to display the corresponding Roman numeral
* `converter(num)`: Recursively converts a given number into its Roman numeral equivalent.

<hr />

### 3. Telephone Number Validator:
Checks if a given input is a valid US phone number. Recieves the user's input and displays a message indicating whether it's a valid or invalid US number.
#### Functions:
* `checkInput()`: Validates and displays whether a given input is a valid US phone number
* `clearInput()`: Resets the displayed results on the page

<hr />

### 4. Cash Register:
Simulates a virtual cash register, helping manage transactions and calculate change. Handles customer payments, updating change information and cash-in-drawer (cid) status. 
#### Functions:
* `purchase()`: Handles customer payments, updating change information and drawer status
* `calculateChange(num)`: Breaks down change denominations based on a given amount, updating the 'cid' and 'outStr' properties
* `changeUpdate()`: Displays the transaction status and possible change
* `drawer_change()`: Shows the remaining cid
* `clear_change_div()`: Resets the total cash in the drawer, 'change_tracker' 'outStr' values, and removes displayed elements in the 'change_due' element
* `floatFixer(num)`: Helper function to ensures accurate floating-point numbers

<hr />

### 5. Pokemon Search App:
Allows users to explore information about different Pokémon. By fetching data from the PokeAPI based on user input, this project displays details such as the Pokémon's name, ID, image, types, stats, height, and weight. Elements are displayed using D3.
#### Functions:
* `search()`: Fetches and displays information about a Pokémon based on user input from the PokeAPI
* `buildPage()`: Constructs the initial page layout, including Pokémon name, ID, image, types, stats, height, and weight
* `updatePage()`: Updates the displayed information on the page
* `typeSelector()`: Dynamically generates and styles Pokémon type elements
* `calcStats(array)`: Calculates and visually represents Pokémon stats using bars
* `barGenerator(num, target, filled)`: Dynamically generates bars based on Pokémon stats parameters
* `formatHeight(number)`, `formatWeight(number)`: Helper functions that convert height and weight values from imperial to metric units
* `removePunctuation(text)`: Helper function that removes punctuation and spaces from the user input
* `displayError(errorText)`: Helper function that displays error messages on the page
