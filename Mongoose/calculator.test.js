


const {sum,subtract,multiply,modulus,divisor} = require('./calculator')


test("Addition" , () => {
    expect(sum(2,5)).toBe(7)
})

test("Difference" , () => {
    expect(subtract(3,4)).toBe(-1)
})


test("Product" , () => {
    expect(multiply(3,4)).toBe(12)
})


test("Modulus" , () => {
    expect(modulus(12,6)).toBe(0)
})


test("Divisor" , () => {
    expect(divisor(12,6)).toBe(2)
})





