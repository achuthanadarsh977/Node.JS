


function operation(c,d,operate){
    return operate(c,d)
}



function add(a,b){
    return a+b
}


function subtract(a,b){
    return a-b
}


function product(a,b){
    return a*b
}


function dividend(a,b){
    return a/b
}

console.log(operation(10,5,add))

console.log(operation(44,33,subtract))

console.log(operation(33,55,product))

console.log(operation(55,5,dividend))