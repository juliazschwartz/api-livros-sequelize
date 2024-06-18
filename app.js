// app.js
const express = require('express');
const exphbs = require('hbs');
const Livro = require('./models/Livro');
const sequelize = require('./config/database');

const app = express();
const port = 3000;

// Configurar Handlebars

app.set('view engine', 'hbs')

// Middleware
app.use(express.urlencoded({ extended: true }));

// Rotas
app.get('/', (req, res) => {
  Livro.findAll()
    .then(livros => {
      res.render('home', { livros });
    })
    .catch(err => console.log(err));
});

app.get('/livros/novo', (req, res) => {
  res.render('novo');
});

app.post('/livros', (req, res) => {
  const { titulo, autor, ano } = req.body;
  Livro.create({ titulo, autor, ano })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
});

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch(err => console.log(err));
