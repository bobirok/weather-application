const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Boris Rokanov'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Boris Rokanov'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'Boris Rokanov'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if(error) {
                return res.send( { error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You  must provide a search term!'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('helpError', {
        name: 'Boris Rokanov'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        name: 'Boris Rokanov',
        errorMessage: 'Sorry this page is unreacheable!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})