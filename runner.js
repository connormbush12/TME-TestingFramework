const fs = require('fs')
//Gotta require in path to use path.join
const path = require('path')

class Runner {
    constructor() {
        this.testFiles = [];
    }

    //Now, we add a new method on our class to run our test files
    async runTests() {
        for (let file of this.testFiles) {
            //We require in our test file so that it is executed within this loop. In our collectFiles method, we push in the new files as an object with a name property that directs to their absolute file path
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