const { italic } = require("chalk");

const assert = require('assert')

//As our first test, we see if the index.html file as an input text box
it('has a text input', async () => {
    const dom = await render('index.html')

    const input = dom.window.document.querySelector('input');

    //If there is no input element, than the input variable will be undefined so the assert will send an error
    assert(input);
})