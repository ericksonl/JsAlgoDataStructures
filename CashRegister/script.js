let price = 19.50
var cash
var cid = []


function purchase() {
    cash = document.getElementById("cash").value
    if (cash < price) {
        alert("Customer does not have enough money to purchase the item")
        return
    } else if (cash === price) {
        document.getElementById("change-due").value = 'No change due - customer paid with exact cash'
    }
    
}
