var Url = require('./model/url');
var validUrl = require('valid-url');

var port = process.env.PORT || 8080;
var express = require('express');


var mongoose = require('mongoose');
require('dotenv').config({
    silent: true
});

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/urlshort' );

var app = express();

app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/new/*', function(req, res){
    var input = 'http://' + req.url.slice(5);
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
        
        /*
    
        
        Url.find({},  function(err, urls){
            if (err) throw err;
            
            console.log(urls);
        });  */
        
        /*Url.findOne({ shortUrl: 'H11LBViP' },  function(err, url){
            if (err) throw err;
            
            console.log(url.originalUrl);
            //res.redirect(url.originalUrl);
        }); */ 
        
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
                console.log(url);
                res.redirect(301, url.originalUrl);
            } else {
                res.send("No short url in the database");
            }
        }); 
        
    });


app.listen(port, function() {
    console.log('Listening on port ' + port);
 });