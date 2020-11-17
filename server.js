const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const PORT = process.env.PORT || 5000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const viewsDir = path.join(__dirname, 'views')
const hbs = exphbs.create({
  defaultLayout: 'index',
  extname: 'hbs',
  layoutsDir: viewsDir + '/layouts',
  partialsDir: [viewsDir + '/partials'],
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './views/layouts'))

app.use(express.static(path.join(__dirname, '/public')))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.get('/favicon.ico', (req, res) => res.sendStatus(200))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/form', urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)
  console.log(JSON.parse(JSON.stringify(req.body)))
  res.redirect('/')
})

http.listen(PORT, () => console.log(`Server started on port : ${PORT}`))
