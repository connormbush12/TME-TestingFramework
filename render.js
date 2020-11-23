//We create a render function that we can use to render any JavaScript web-based programs for testing purposes

const path = require('path')
const jsdom = require('jsdom')
const {JSDOM} = jsdom

const render = async (filename) => {
    //The file path is the current working directory joined with the individual filename
    const filePath = path.join(process.cwd(), filename)

    //We use the JSDOM.fromFile() functoin to create our dom using the file path
    const dom = JSDOM.fromFile(filePath, {
        runScripts : 'dangerously',
        resources : 'usable'
    })

    return dom;
}

//We export out the function itself, not an execution of the function (which would be module.exports = render();)
module.exports = render;
