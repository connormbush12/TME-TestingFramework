//We want to use File Systems' file and directory reading functions for our collectFiles function
const fs = require('fs')

class Runner {
    constructor() {
        this.files = [];
    }
    //We make collectFiles async so that we can use the promised-based version of fs.readdir
    //We also pass through our targetPath
    async collectFiles(targetPath) {
        //We make our files variable equal to the readdir() function and then return the files
        const files = fs.promises.readdir(targetPath)

        return files;
    }
}


module.exports = Runner;