console.log('JS file loaded!')



const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = input.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        console.log(response)
        response.json().then((data) => {
            if (data.error){
                msg1.textContent = "Location Not Found! Please enter another location..."
                console.log(data);
            }
            else {
                console.log('Forecast: ', data.forecast, '\nLocation: ', data.location)
                msg1.textContent = "Location: " + data.location
                msg2.textContent = "Current Forecast: " + data.forecast
            }

        })
    })
})

