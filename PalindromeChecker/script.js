function checker() {
    let value = document.getElementById("text-input").value
    let basicStr = removePunctuation(value.toLowerCase())

    if (value === "") {
        alert("Please input a value")
    } else {
        let reverse = basicStr.split("").reverse().join('')
        console.log(basicStr, "\n", reverse)
        if (reverse == basicStr) {
            document.getElementById("result").innerHTML = value + " is a palindrome"
        } else {
            document.getElementById("result").innerHTML = value + " is not a palindrome"
        }
    }
}

function removePunctuation(text) {
    var punctuation = /[\-.,?!_)()/\\: ]/g;
    var newText = text.replace(punctuation, "");
    return newText;
}