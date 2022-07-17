const express = require('express')
const path = require('path')
const app = express()

const User = require('./database/models/user')
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', function (req, res) {})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const hash = await bcrypt.hash(password, salt)
  const user = await User.findOne({
    where: {
      email: email,
      password: hash
    }
  })
})
app.get('/users', async (req, res) => {
  const usuarios = await User.findAll()
  res.render('pages/users/index', { usuarios })
})
app.get('/feed', (req, res) => {
  res.render('pages/feed/index')
})

app.get('/register', (req, res) => {
  res.render('pages/register/index')
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body
  User.create({
    name,
    email,
    password
  })

  res.redirect('/login')
})

app.listen(3000, function () {
  console.log('servidor está rodando na porta 3000')
})
