const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

// Express app
const app = express();

// Connect to MongoDB
const dbURI = 'mongodb+srv://filipstoj:Mansnothot11@cluster0.zljlfpt.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// Register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews'); If you want another name to your views folder than the default


// Middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// Routes
app.get('/', (req, res) => {
    // // res.send('<p>Home page</p>');
    // // res.sendFile('./views/index.html', { root: __dirname }); Don't want to send a file but we want to render a view
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ispum dolar sit amet consectetur'},
    //     {title: 'Stoj finds Pussy', snippet: 'Lorem ispum dolar sit amet consectetur'},
    //     {title: 'Fred finds Nothing', snippet: 'Lorem ispum dolar sit amet consectetur'},
    // ];
    // res.render('index', { title: 'Home', blogs });
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p>About page</p>');
    // res.sendFile('./views/about.html', { root: __dirname }); Don't want to send a file but we want to render a view
    res.render('about', { title: 'About' });
});


app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});