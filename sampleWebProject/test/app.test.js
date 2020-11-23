const { italic } = require("chalk");

const assert = require('assert');
const render = require("../../render");

//As our first test, we see if the index.html file as an input text box
it('has a text input', async () => {
    const dom = await render('index.html')

    const input = dom.window.document.querySelector('input');

    //If there is no input element, than the input variable will be undefined so the assert will send an error
    assert(input);
})

it('shows a success message with valid email', async() => {
    const dom = await render('index.html')
    const input = dom.window.document.querySelector('input');
    input.value = 'coolfakeemail@coolcon.com'

    dom.window.document.querySelector('form')
        .dispatchEvent(new dom.window.Event('submit'))

    const h1 = dom.window.document.querySelector('h1')

    assert.strictEqual(h1.innerHTML, 'Looks good!')
})

it('shows a fail message with an invalid email', async() => {
    const dom = await render('index.html')
    const input = dom.window.document.querySelector('input');
    input.value = 'badfakeemail'

    dom.window.document.querySelector('form')
        .dispatchEvent(new dom.window.Event('submit'))

    const h1 = dom.window.document.querySelector('h1')

    assert.strictEqual(h1.innerHTML, 'Invalid email')
})