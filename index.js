const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

/* ---------------------------- setups and config --------------------------- */
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))


/* ------------------------------- middleware ------------------------------- */
app.use('/api/members', require('./routes/members'))

app.get('/', (req,res) => res.json({ msg: 'Health Check'}))

app.use((req,res) => res.sendFile(path.join(__dirname, 'public', '404.html')))

/* -------------------------------- listener -------------------------------- */
const PORT = process.env.PORT || 8000 
app.listen(PORT)