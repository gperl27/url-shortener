var Url = require('./model/url');
var validUrl = require('valid-url');
var path = require('path');
var port = process.env.PORT || 8080;
var express = require('express');


var mongoose = require('mongoose');
require('dotenv').config({
    silent: true
});
var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/urlshort' );



//app.use(express.static(__dirname + '/views'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index');
});

app.get('/test', function(req, res){
   res.redirect('http://google.com'); 
});

app.get('/new/:urlInput(*)', function(req, res){
    var input = req.params.urlInput;
    //console.log(req.protocol);
    //console.log(input);
    
    if (validUrl.isWebUri(input)){
        
        var newUrl = Url({
           originalUrl: input,
           shortUrl: input.shortid
        });
        
  
        newUrl.save(function(err){
            if(err) throw err;
            
            console.log('user saved successfully');
        }); 
        
        res.json({
            'original': newUrl.originalUrl,
            'new': newUrl.shortUrl
        });
    } else {
        
        console.log('not a URI');
        res.send('Not a valid URI');
    }
    
});
    
    app.get('/:short', function(req, res){
        var short = req.params.short;
        
         Url.findOne({ shortUrl: short },  function(err, url){
            if(err){
                throw err;
            } 
            
            if(url){
                console.log(url.originalUrl);
                res.redirect(url.originalUrl);
            } else {
                res.send("No short url in the database");
            }
        }); 
        
    });


app.listen(port, function() {
    console.log('Listening on port ' + port);
 });