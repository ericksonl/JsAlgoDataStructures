var value 

function checker() {
    value = document.getElementById('number').value
    if (value > 4000 || typeof value !== 'number') {
        alert('no')
    }
}