console.log('Client side js file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const error = document.getElementsByClassName('error')
const correct = document.getElementsByClassName('correct')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            error[0].innerHTML = data.error
            correct[0].innerHTML = ''
        }
        else {
            error[0].innerHTML = ''
            correct[0].innerHTML = data.location + '   Summary: ' + data.forecast.summary + '  ' + 
            data.forecast.temperature + 'F.  Chance of rain: ' + data.forecast.precip
        }
    })
})
})