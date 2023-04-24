const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine' , 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/' , (req, res) => {
    fs.readFile('./free.json', 'utf-8' , (err, data) => {
        const read = JSON.parse(data);

        res.render('index', {data : read});
    })
});

app.get('/delete/:id' , (req,res) => {
    fs.readFile('./free.json', 'utf-8' , (err, data) => {
        const read = JSON.parse(data);

        const id = req.params.id;
        const find = read.find(d => d.id === parseInt(id));

        res.render('delete' , {data : find});
    })
})

app.post('/delete/:id' , (req, res) => {
    fs.readFile('./free.json' , 'utf-8' , (err, data) => {
        const read = JSON.parse(data);

        const id = req.params.id
        const index = read.find(d => d.id === parseInt(id));
        read.splice(index, 1);

        fs.writeFile('./free.json', JSON.stringify(read) , err => {
            if(err) throw err;
        })
        res.redirect('/');
    })
})

app.listen(8080, () => {
    console.log('Processing ongoing.....');
})