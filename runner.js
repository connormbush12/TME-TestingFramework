//The runner class is going to be responsible for collecting all of the files that have .test in their filename. It will then use some function that sets up our environment to do testing. Finally, it will go through and run our test files one by one.
class Runner {
    constructor() {
        //One thing we know we'll need to do is collect all of the files that have .test in their filename, so for now we create a this.files array in our constructor that will store all of our files that we find
        this.files = [];
    }
    //In relation to the above, we know we'll need a function / method for collecting all of the files.
    collectFiles() {

    }
}

//At the end, we make sure we export out our Runner class to be used
module.exports = Runner;