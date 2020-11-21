//Create a test for our forEach function we defined
const assert = require('assert')
const {forEach} = require('../index')

//Since we defined a global it and global beforeEach in our runner.js file, we can now use tme with this test file

//As our beforeEach, we are resetting the numbers array to be [1,2,3] before every test
let numbers;
beforeEach(() => {
    numbers = [1,2,3]
})
it('should sum an array', () => {
    const numbers = [1,2,3]
    let total = 0
    forEach(numbers, (value) => {
        total += value
    })

    assert.strictEqual(total, 6)

    //To test to make sure our beforeEach works, we are going to push in an extra number and then check the length below to make sure it is reset at [1,2,3]
    numbers.push(3)
})

it('beforeEach is ran each time', () => {
    assert.strictEqual(numbers.length, 3)
})