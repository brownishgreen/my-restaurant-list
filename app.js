const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results


app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

//使用public內的靜態資料
app.use(express.static('public')) 

//重新導向/restaurants介面
app.get('/', (req, res) => {
  res.redirect('/my-restaurant-list')
})
//渲染 restaurants list
app.get('/my-restaurant-list', (req, res) => {
  const keyword = req.query.keyword?.trim().toLowerCase()
  const matchedRestaurants = keyword ? restaurants.filter(restaurant =>
    Object.values(restaurant).some(property => {
      if (typeof property === 'string') {
      return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  ):restaurants
  res.render('index', { restaurants: matchedRestaurants, keyword })
})

app.get('/my-restaurant-list/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((restaurant) => restaurant.id.toString() === id)
  res.render('show', { restaurant } )
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})