const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

//We create an array of forbidden directories that we don't want our testing framework to check. Typically, this will include node-modules
const forbiddenDirs = ['node_modules']

class Runner {
    constructor() {
        this.testFiles = [];
    }

    async runTests() {
        for (let file of this.testFiles) {
            console.log(chalk.gray(`--- ${file.shortName}`))
            const beforeEaches = [];
            global.beforeEach = (fn) => {
                beforeEaches.push(fn)
            }
            
            global.it = (desc, fn) => {
                beforeEaches.forEach(func => func())
                try {
                    fn();
                    console.log(chalk.green(`\tOK - ${desc}`))
                } catch(err) {
                    const message = err.message.replace(/\n/g, '\n\t\t')
                    console.log(chalk.red(`\tX - ${desc}`))
                    console.log(chalk.red('\t', message))
                }
            }
            //We could also have an error requiring in our file as well
            try {
                require(file.name)
            } catch(err) {
                console.log(chalk.red(err))
            }
        }
    }

    async collectFiles(targetPath) {
        const files = await fs.promises.readdir(targetPath)
        for (let file of files) {
            const filepath = path.join(targetPath, file)
            const stats = await fs.promises.lstat(filepath);
            if(stats.isFile() && file.includes('.test.js')) {
                this.testFiles.push({name : filepath, shortName : file})
                //Not only must the file be a directory for us to look into it, now it much not be in our list of forbidden directories
            } else if(stats.isDirectory() && !forbiddenDirs.includes(file)) {
                const childFiles = await fs.promises.readdir(filepath)

                files.push(...childFiles.map(f => path.join(file, f)));
            }

        }
    }
}


module.exports = Runner;