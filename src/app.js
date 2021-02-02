const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))
const app = express()


//define paths for express config
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
        name: 'Rina Solanki'
    })
})


app.get('/about', (req, res) => {

    res.render('about', {

        title: 'About Me',
        name: 'Rina Solanki'
    })
})




/*app.get('', (req, res) => {
    
    res.send('<h1>Weather</h1>')
    
})


app.get('/help', (req, res) =>{
    res.send({
        name: 'Andrew',
        age: 21
    })
    
    res.send([{
        name: 'Andrew',
        age: 21
    },{name: 'Sarah'}])
})




app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})
*/

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Rina Solanki'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

/*
app.get('/help/*', (rwq, res) => {

    res.send('Help article not found')

})
//this get should be last
app.get('*', (req, res) => { // * for any url
    res.send('My 404 page')

})
*/

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })

    }
    req.query
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'Rina Solanki',
        errorMessage: 'Help article not found.'
    })

})

app.get('*', (req, res) => { // * for any url
    res.render('404', {
        title: '404',
        name: 'Rina Solanki',
        errorMessage: 'Page not found'

    })

})

//it is a method to start server  3000 is localhost port number
app.listen(3000, () => {

    console.log('Server is on port 3000.')

})
