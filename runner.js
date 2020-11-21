const fs = require('fs')
const path = require('path')

class Runner {
    constructor() {
        this.testFiles = [];
    }

    async runTests() {
        for (let file of this.testFiles) {
            //We create two global properties that we can use throughout Node JS - beforeEach and it. These mirror what they use for Mocha

            //beforeEach sets up our code before each new test. To do this, we create an empty array and then push a function into it
            const beforeEaches = [];
            global.beforeEach = (fn) => {
                beforeEaches.push(fn)
            }
            
            //it is what runs our tests. It gives a description and a function
            global.it = (desc, fn) => {
                //First, we execute every function in our beforeEaches array, which simulates beforeEach from Mocha
                beforeEaches.forEach(func => func())
                //Now that the code is set up, we run the test function we passed through
                fn();
            }
            require(file.name)
        }
    }

    async collectFiles(targetPath) {
        const files = await fs.promises.readdir(targetPath)
        for (let file of files) {
            const filepath = path.join(targetPath, file)
            const stats = await fs.promises.lstat(filepath);
            if(stats.isFile() && file.includes('.test.js')) {
                this.testFiles.push({name : filepath})
            } else if(stats.isDirectory()) {
                const childFiles = await fs.promises.readdir(filepath)

                files.push(...childFiles.map(f => path.join(file, f)));
            }

        }
    }
}


module.exports = Runner;