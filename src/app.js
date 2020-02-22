const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather-App',
        name: 'Adil Otha'
    })
})

app.get('', (req, res) => {
    res.send('Hello Express!')
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "Enter your City Name to get its Current Forecast!",
        title: 'Help',
        name: 'Adil Otha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Adil Otha'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }
    geocode(req.query.address, (error, { lat, long, loc }={}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(lat, long, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: data,
                location: loc,
                address: req.query.address
            })
        })

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help 404 Not Found'
    })
})

app.get('*', (req, res) => {
    //res.send("<h2>Error: 404 Not Found!</h2>")
    res.render('404', {
        title: '404',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})