let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

let price = 19.5

const change_tracker = [
    { name: 'ONE HUNDRED', value: 10000, outStr: 0 },
    { name: 'TWENTY', value: 2000, outStr: 0 },
    { name: 'TEN', value: 1000, outStr: 0 },
    { name: 'FIVE', value: 500, outStr: 0 },
    { name: 'ONE', value: 100, outStr: 0 },
    { name: 'QUARTER', value: 25, outStr: 0 },
    { name: 'DIME', value: 10, outStr: 0 },
    { name: 'NICKEL', value: 5, outStr: 0 },
    { name: 'PENNY', value: 1, outStr: 0 }
];
const change_due = document.getElementById("change-due")
const changeElement = document.getElementById("change")
const CENT_IN_DOLLAR = 100

let [cash, converted_cash, total_cid, reg_status, missed_change] = [null, null, null, null, ''];

//Upon load, add the price and drawer change
document.addEventListener('DOMContentLoaded', function () {
    const totalElement = document.getElementById('total')
    totalElement.innerHTML = `$${price.toFixed(2)}`
    drawer_change()
})

//Handles purchase button, updating change information and drawer status.
const purchase = () => {
    //clear any elements in change_due
    clear_change_div()

    cash = document.getElementById("cash").value

    //get total cash in drawer
    for (let i = 0; i < cid.length; i++) {
        total_cid = floatFixer(total_cid) + floatFixer(cid[i][1]);
    }
    total_cid = floatFixer(total_cid);

    if (cash.length == 0) {
        alert('Invalid input')
    } else if (cash < price) {
        alert("Customer does not have enough money to purchase the item")
        return
    } else if (cash == price) {
        change_due.innerHTML = 'No change due - customer paid with exact cash'
        return
    } else if (cash - price > total_cid) {
        reg_status = 'INSUFFICIENT_FUNDS'
    } else {
        console.log(cash - price, total_cid)
        if (cash - price == total_cid) {
            reg_status = 'CLOSED'
        } else {
            reg_status = 'OPEN'
        }
        converted_cash = parseInt((cash - price) * CENT_IN_DOLLAR)
        calculateChange(converted_cash)
    }
    changeUpdate()
    drawer_change()
}


/*
Calculates the change breakdown for a given amount 'num'.
Iterates through elements in 'change_tracker' and updates values in the 'cid' array accordingly.
Updates 'outStr' property in 'change_tracker'.
*/
const calculateChange = (num) => {

    //slowly breaks down the change to 0
    //for each element of change_tracker
    for (const element of change_tracker) {

        //find the matching element in CID array (PENNY find PENNY)
        let matching_cid = cid.find((index) => index[0] === element.name)

        //find index of matching element
        let index = cid.indexOf(matching_cid)

        //to accomodate for the final test, adding html elements > value but = 0. 
        if (num >= element.value && cid[index][1] == 0) {
            missed_change += `<p>${element.name}: $0</p><br />`
        } else {
            //while num is greater than the elements value
            while (num >= element.value && cid[index][1] > 0) {
                //decrease num by elements value
                num -= element.value;

                //convert element value to dollar amount
                let convert_dollar = element.value / CENT_IN_DOLLAR

                //decrease matching element in cid array by element value
                cid[index][1] = floatFixer(parseFloat(cid[index][1] - convert_dollar))

                //add element value to the outstr value
                element.outStr += convert_dollar
            }
        }
    }
    if (num != 0) {
        reg_status = 'INSUFFICIENT_FUNDS'
    }
}

//Updates the HTML content of 'change_due' element with register status and possible change.
const changeUpdate = () => {
    change_due.innerHTML += `<h3>Status: ${reg_status}</h3><br />`
    if (reg_status !== 'INSUFFICIENT_FUNDS') {
        //find all elements in change_tracker where outStr is not 0 (base value)
        let filtered_items = change_tracker.filter((element) => element.outStr !== 0)
        change_due.innerHTML += missed_change
        filtered_items.forEach(element => {
            change_due.innerHTML += `<p>${element.name}: $${floatFixer(element.outStr)}</p><br />`
        })
    }
}

//Updates the HTML content of the 'change' element with remaining change in the register
const drawer_change = () => {
    changeElement.innerHTML = `<h3>Change in Drawer</h3>`

    cid.forEach(element => {
        changeElement.innerHTML += `<p>${element[0]}: $${element[1]}</p> `
    })
}

//Resets the total cash in drawer, change_tracker outstr values, and removes all children nodes from the 'change_due' element
const clear_change_div = () => {
    total_cid = 0
    change_tracker.forEach(element => {
        element.outStr = 0
    })
    while (change_due.firstChild) {
        change_due.removeChild(change_due.firstChild);
    }
}

//Fixes floating point numbers
const floatFixer = (num) => {
    return parseFloat(num.toFixed(2))
}
