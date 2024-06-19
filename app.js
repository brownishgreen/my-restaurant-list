const express = require('express')
const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.redirect('my-restaurant-list')
})

app.get('/my-restaurant-list', (req, res) => {
  res.send('listing restaurant')
})

app.get('/my-restaurant-list', (req, res) => {
  const id = req.params.id
  res.send(`read movie: ${id}`)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})