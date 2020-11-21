//Create a sample forEach function to test
module.exports = {
    forEach(arr, fn) {
        for (let element of arr) {
            fn(element)
        }
    }
}