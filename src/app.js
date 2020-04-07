const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
    //const forecast = require('./utils/forecast')

const app = express()

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akash Darekar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akash Darekar'

    })
})

app.get('/help', (req, res) => {
        res.render('help', {
            helpText: 'This is some helpfull text...',
            title: 'Help',
            name: 'Akash Darekar'
        })
    })
    // app.get('', (req, res) => {
    //             res.send('<h1> Weather</h1>')
    //             })

// app.get('/help', (req, res) => {
//     res.send([{
//         name:'Akash'
//     }, 
//     {
//         name:'Rahul'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide Address term'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            res.send({ error })
        }
        res.send({
            latitude,
            longitude,
            location
        })
    })

    // res.send({
    //     forecast: 'today is rain',
    //     location: 'Mumbai',
    //     address: req.query.address
    // })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Akash Darekar'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page Not Found',
        name: 'Akash Darekar'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})