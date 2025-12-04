

import {absolute} from "./absolute.js"


describe("absolute" , () => {
    it('positive' , () => {
        expect(absolute(1)).toBe(1)
    })

    it('negative' , () => {
        expect(absolute(-1)).toBe(1)
    })

    it('Zero' , () => {
        expect(absolute(0)).toBe(0)
    })
})