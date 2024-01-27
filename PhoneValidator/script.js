const resultDiv = document.getElementById('results-div')
const inputBox = document.getElementById('user-input')
const invalidText = 'Invalid US number: '
const validText = 'Valid US number: '

//start string and group of either 1, 1 space, or nothing.   ^(1\s?)?
const usCode = '^(1\\s?)?'

//Group of either 3 digits. (Matches 555) OR 3 digits with (). (Matches: (555)).    (\d{3}|\(\d{3}\))
const areaCode = '(\\d{3}|\\(\\d{3}\\))'

// Either - or space.   [\s\-]?
const spacesDashes = '[\\s\\-]?'

// 3 digits.    \d{3}
const prefix = '\\d{3}'

// 4 digits and end string.    \d{4}$
const lineNum = '\\d{4}$'

const phoneNumRegex = new RegExp(`${usCode}${areaCode}${spacesDashes}${prefix}${spacesDashes}${lineNum}`)

console.log(phoneNumRegex)

//common function syntax in js is to use arrow operator
const checkInput = () => {
    let userInput = inputBox.value
    if (userInput.length == 0) {
        alert('Please provide a phone number')
    } else if (phoneNumRegex.test(userInput) === true) {
        resultDiv.innerHTML = `${resultDiv.innerHTML} <p>${validText} ${userInput}</p>`
    } else {
        resultDiv.innerHTML = `${resultDiv.innerHTML} <p>${invalidText} ${userInput}</p>`
    }
};

const clearInput = () => {
    document.getElementById('results-div').innerHTML = ''
};