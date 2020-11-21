//Create a test for our forEach function we defined
const assert = require('assert')
const {forEach} = require('../index')

//We use it() at first so we can test it with mocha to see if it works
it('should sum an array', () => {
    const numbers = [1,2,3]
    let total = 0
    forEach(numbers, (value) => {
        total += value
    })

    assert.strictEqual(total, 6)
})