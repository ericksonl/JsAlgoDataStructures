const outputBox = d3.select('#output')
const roman = {
    M: 1000,
    CM: 900,
    D: 500,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
}

var input
var outStr

function checker() {
    //set outStr to a blank string
    outStr = ''

    input = document.getElementById('number').value

    //convert input to an int    
    let input_num = Number(input)
    outputBox.style('display', 'block')

    //if the input is blank or 0 (not an int), error
    if (input_num === '' || input_num === 0) {
        outputBox.text('Please enter a valid number')
    } else if (input_num < 0) {
        outputBox.text('Please enter a number greater than or equal to 1')
    } else if (input_num >= 4000) {
        outputBox.text('Please enter a number less than or equal to 3999')
    } else {
        //reset output box
        outputBox.text('')
        //call converter function
        outputBox.text(converter(input))
    }
}

function converter(num) {
    //loop over each key in roman object
    for (let i of Object.keys(roman)) {
        //if num is 0, stop the loop
        if (num == 0) {
            return outStr
        } else if (Math.floor(num / roman[i]) >= 1) { //else if the num / roman key value is >= 1 (for division by 1)
            //subtract value from num
            num -= roman[i]
            //add key value to outstr
            outStr += i
            //callback 
            return converter(num)
        }
    }
}