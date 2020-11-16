const fs = require('fs')
const path = require('path')
const app = require('express')()
const http = require('http').createServer(app)
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

const htmlRender = (fileName, res) => {
  fs.readFile(path.join(__dirname, 'public', fileName), (err, data) => {
    if (err) throw err

    res.end(data)
  })
}

app.get('/favicon.ico', (req, res) => res.sendStatus(200))

app.get('/', (req, res) => {
  htmlRender('index.html', res)
})

app.post('/', urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body)
  htmlRender('sucsess.html', res)
})

http.listen(PORT, () => console.log(`Server started on port : ${PORT}`))
