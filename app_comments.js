

var express     = require('express'),                               
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    LocalStrategy = require('passport-local'),
    Trail = require("./models/trail_comments"),              
    seedDB     = require("./seeds_comments"),
    Comment    = require("./models/comment_comments"), 
    User       = require("./models/user_comments"),                    
    methodOverride  = require("method-override"),
    flash       = require("connect-flash");                           
    
    
//Refactoring routes into different files    
var commentRoutes=require("./routes/comments_comments"),
    trailRoutes=require("./routes/trails_comments"),
    indexRoutes=require("./routes/index_comments");


    
// creates some seed trails with comments to start with   
// seedDB(); 

//PASSPORT configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());       
passport.deserializeUser(User.deserializeUser());   

app.use(flash());

app.use(require('express-session')({    
    secret: "Rusty is the cutest dog",
    resave:"false",
    saveUninitialized :"false"
}));
          
app.use(passport.initialize());  
app.use(passport.session());     

// middleware to send data to EVERY route
app.use(function(req,res,next){                 
    res.locals.currentUser=req.user;             
    res.locals.error=req.flash("error");        
    res.locals.success=req.flash("success");
    next();                                     
    })


app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

// mongoose.connect('mongodb://localhost/traildB');                                   //C9 mongo database
mongoose.connect(process.env.DATABASEURL);                                            //In command line --> export DATABASEURL= C9 or Mongo database 

app.use(express.static('public'));

app.use(methodOverride("_method"));       

    
app.use("/trails/:id/comments",commentRoutes);                         
app.use("/trails",trailRoutes);
app.use(indexRoutes);

                                  


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("server started ... ");
});

