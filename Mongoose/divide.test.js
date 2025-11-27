const { divide } = require("lodash")


module.exports = divide


test("3 / 1 = 3" , () => {
    expect(divide(3,1)).toBe(3)
}) 