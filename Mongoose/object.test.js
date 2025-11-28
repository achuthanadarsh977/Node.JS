test("object equality" , () => {
    const user = {name:'Sam' , age:25}
    expect(user).toEqual({name:'Sam' , age:25})
})



test("equality" , () => {
    const user = {name:'Sam' , age:25}
    expect(user).toHaveProperty("name","Sam")
})

test("double equality" , () => {
    const user = [{name:'Sam' , age:30} , {name:'Don',age:43}]
    expect(user).toContainEqual({name:'Sam' , age:30})
})


