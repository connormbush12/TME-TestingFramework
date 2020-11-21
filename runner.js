const fs = require('fs')
//Gotta require in path to use path.join
const path = require('path')

class Runner {
    constructor() {
        this.testFiles = [];
    }
    async collectFiles(targetPath) {
        const files = await fs.promises.readdir(targetPath)
        //Now that we have an array of all of the files / folders we have, we want to find any test files by looking through all of the folders.
        for (let file of files) {
            //First, we get the full filepath for the file by joining the targetpath and the file name
            const filepath = path.join(targetPath, file)
            
            //Now, we want to get the stats about that file to determine if it's a file or directory
            const stats = await fs.promises.lstat(filepath);

            //First, we check for two things: if it is a file AND if so, if the file includes .test.js
            if(stats.isFile() && file.includes('.test.js')) {
                //If it is a test file, then we want to push it as an object itno our testFiles array so we can get that information later
                this.testFiles.push({name : filepath})
            } else if(stats.isDirectory()) {
                //If we have another directory, we essentially want to do what we did above: read the files in it and save it all to an array.
                const childFiles = await fs.promises.readdir(filepath)

                //Now, we push each element of this childFiles array into files by spreading it in there.
                //We also have to make sure we capture the entire path name, so we don't push in childFiles, rather we map over it and create an array with their full paths shown and then spread that into files
                files.push(...childFiles.map(f => path.join(file, f)));
            }

        }
    }
}


module.exports = Runner;