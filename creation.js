const { subtract } = require("lodash")




function add(a,b){
    return a+b
}

function product(a,b){
    return a*b
}

function substract(a,b){
    return a-b
}

module.exports = {
    add,
    product,
    subtract
}