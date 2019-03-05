const express = require('express');
const app = express()
var exphbs = require('express-handlebars');

// mock Array
let reviews = [{
    title: "great reviews", movieTitle: "IronManII"}, {title: "bad reviews", movieTitle: "BatManII"},
    {title: "great reviews", movieTitle: "BatManI"}, {title: "bad reviews", movieTitle: "IronManI"}]

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', {msg: 'Handlebars are Cool!'});
})

app.get('/reviews', (req, res) => {
    res.render('reviews-index', { reviews: reviews });
})

app.listen(3000, () => {
    console.log("Listening on 3000!")
})