var input
const outputBox = document.getElementById("output")
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

function checker() {
    input = document.getElementById('number').value
    let input_num = Number(input)

    let output = d3.select('#output')

    console.log(input_num)
    if (input_num === '' || input_num === 0) {
        output.text('Please enter a valid number')
    } else if (input_num < 0) {
        output.text('Please enter a number greater than or equal to 1')
    } else if (input_num >= 4000) {
        output.text('Please enter a number less than or equal to 3999')
    } else {
        output.text('')
        converter()
    }
}

function converter() {
    // console.log("Before: ", value)
    // value = Number(value)
    // console.log("After: ", value)
    // for (let i = 0; i < value.length; i++)
}