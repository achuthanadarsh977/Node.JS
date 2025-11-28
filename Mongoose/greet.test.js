

const greet = require('./greet')


test('Our first greeting' , () => {
    expect(greet('John')).toBe('Hello John')
})


// test('Contains substring', () => {
//     expect('Someone must have substring').toContain('substring')
// }) 


// test('email format check' , () => {
//     expect('user@gmail.com').toMatch(/@gmail\.com$/)
// })


// test('start with hello' , () => {
//     expect('Hello World').toMatch('/^Hello/')
// })


// test('end with world' , () => {
//     expect('Hello World').toMatch('/World$/')
// })

