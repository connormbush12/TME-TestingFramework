#!/usr/bin/env node
//I need to require in our runner and create an instance of this.
const Runner = require('./runner')
const runner = new Runner();

//Then, we want to use the collectFiles function on our runner to test it. Since we want to await the results, we need to wrap this in an asynchronous function
const run = async () => {
    //For now, we use process.cwd() so that we collect the files from the current working directory that we are in inside of our terminal
    const results = await runner.collectFiles(process.cwd())
    console.log(results)
}

run();