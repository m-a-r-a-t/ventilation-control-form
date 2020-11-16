const fs = require('fs')
const app = require('express')()
const http = require('http').createServer(app)
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.sendStatus(200)
})

http.listen(PORT, () => console.log(`Server started on port : ${PORT}`))
