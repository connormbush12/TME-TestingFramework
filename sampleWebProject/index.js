document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const header = document.querySelector('h1')
    const {value} = document.querySelector('input')
    if (value.includes('@')) {
        header.innerHTML = 'Looks good!'
    } else {
        header.innerHTML = 'Invalid email'
    }
})