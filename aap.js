const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes');
//Create a express app
const app = express();

//connet to mongodatabase
const dbUrL = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
mongoose.connect(dbUrL, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{app.listen(3000, (err)=>{
    console.log('listening server 3000')});
})
.catch((err)=>console.log(err));

/*/connect to mongodatabase
const dbUrl = 'mongodb+srv://dev-94:Test1234@project-blog.9b0qb.mongodb.net/Blog-Dev?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{app.listen(3000, (err)=>{
    console.log('listening server 3000')});
})
.catch((err)=>console.log(err));*/
//Register view engine
app.set('view engine', 'ejs');
//Listen for requests

//3rd party middleware
app.use(morgan('dev'));


//static files Middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));



app.get('/', (req, res)=> {
  res.redirect('/blogs');
});


app.get('/about', (req, res)=>{
    res.render('about', { title: 'About'});
});


//blog routes
app.use('/blogs',blogRoutes);
//app.use('/upload', blogRoutes);
app.use((req, res)=> {
      res.status(404).render('404', { title: '404'});
});