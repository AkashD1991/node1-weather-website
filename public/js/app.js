console.log('Client side javascript file is loaded')


// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('Form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error
            } else {
                // console.log(data.latitude)
                // console.log(data.longitude)
                // console.log(data.location)
                messageOne.textContent = data.latitude
                messageTwo.textContent = data.longitude
                messageThree.textContent = data.location
            }

        })
    })

})