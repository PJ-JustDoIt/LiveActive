
var express     = require("express");   
var router      = express.Router();
var passport    = require('passport');
var User        = require("../models/user_comments");


//landing page
router.get("/",function(req,res){                 
  res.render("landing_comments");
});


//AUTHENTICATION ROUTES
//Shows register form 
router.get("/register",function(req,res){  
    res.render("register_comments");
});

//Register form posts here
router.post("/register",function(req,res){   
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){     
    if(err)
     {  console.log("you are here"+err);
        req.flash("error",err.message);   
        res.redirect("/register");
     }
    else
     {  
        req.flash("success","Welcome to LiveActive  "+  req.body.username);
        passport.authenticate("local")(req,res,function(){     
        res.redirect("/trails");
        });
     }
    });
});


//Shows login form  - authenticates user login/pwd and lets them enter the secret page
router.get("/login",function(req,res){  
    res.render("login_comments");
});

//login form posts here  - the login password credentials are checked with the registereg details .
router.post("/login",passport.authenticate("local",
    {                                           
        successRedirect:"/trails",
        failureRedirect:"/login"
    }), function(req,res){   
});


//Logout route
router.get("/logout",function(req,res){  
    req.logout(); 
    req.flash("success","you have now logged out!");        
    res.redirect("/trails");
});




module.exports=router;