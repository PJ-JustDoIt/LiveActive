
var express=require("express");
var router =express.Router();
var Trail=require("../models/trail_comments");

var middleware=require("../middleware/index_comments.js");  
var weather = require('weather-js');


router.use(express.static('public'));


    
// INDEX ROUTE - display all trails from db
router.get("/",function(req,res){        
  Trail.find({},function(err,retnalltrails){               
    if(err){
     console.log("Something went wrong")}
    else{
     res.render("trails/index_comments",{trails:retnalltrails,currentUser:req.user}); 
    };   
  });
});

// CREATE ROUTE - add a new trail to db and display all trails from db including the newly added one using res.redirect. isLoggedIn makes sure that only a logged-in user can add a new trail.
router.post("/",middleware.isLoggedIn, function(req,res){      
   // res.send("you have come to POST route ");
    var name=req.body.name;
    var image=req.body.image; 
    var description=req.body.description;
    var dontMiss=req.body.dontMiss;    
    var star = req.body.star;
    var hiketrail=req.body.hiketrail;
    var biketrail=req.body.biketrail;
    var newTrail = {name:name,           
                         image:image,
                         author:{id:req.user._id,
                                 username:req.user.username},
                         description:description,
                         dontMiss:dontMiss,
                         star:star,
                         biketrail:biketrail,
                         hiketrail:hiketrail
                        };
                        
    Trail.create(newTrail  , function(err,newlyCreated){
    if(err){                          
     console.log("Something went wrong");}
    else{
    res.redirect("/trails");}                 
    });                     
});

//NEW ROUTE -  Shows form and create new trail info from user . isLoggedIn makes sure that only a logged-in user can add a new trail.
router.get("/new",middleware.isLoggedIn,function(req,res){  
    res.render("trails/new_comments");
});



// SHOW ROUTE - shows more info about one a particular trail  
router.get("/:id",function(req,res){  

    Trail.findById(req.params.id).populate("comments").exec(function(err,foundTrail){      
        if(err)
         {console.log(err);}
        else
         {
             weather.find({search: foundTrail.name , degreeType: 'F'}, function(err, result) {
              var weatherInfo={};     
              if(err) 
              {console.log(err);
                       weatherInfo={ 
                                    temperature:null,
                                    degreetype : null,
                                    humidity : null,
                                    windspeed:null,
                                    imageUrl:null }
              }
              else
              {           
                       weatherInfo = {
                                    temperature:result[0].current.temperature,
                                    degreetype : result[0].location.degreetype,
                                    humidity : result[0].current.humidity,
                                    windspeed:result[0].current.windspeed,
                                    imageUrl:result[0].current.imageUrl
                                 };
              }  
              
             var starstr=""; 
             for(var count=1;count<=foundTrail.star;count++){ 
               starstr+="*"
             }
                                     
              res.render("trails/show_comments",{trail:foundTrail, weatherInfo:weatherInfo ,starstr:starstr});                   
             });
         }   // else         
    });

});

//EDIT trail route - only user that created trail can edit it and that user needs to be logged in to edit it. 
router.get("/:id/edit",middleware.checkTrailOwnership,function(req,res){           // for making sure only if u've logged in and if user matches trail creator, you can proceed 
        Trail.findById(req.params.id).exec(function(err,foundTrail){ 
            if(err)
             {  res.redirect("/trails");}
            else
             {                    
                res.render("trails/edit_comments",{trail:foundTrail});
             }
        });
});


//UPDATE Trail route - only user that created trail can update it and that user needs to be logged in to update it.
router.put("/:id",middleware.checkTrailOwnership,function(req,res){     
    var name=req.body.name;
    var image=req.body.image; 
    var description=req.body.description;
    var dontMiss=req.body.dontMiss;
    var star=req.body.star;
    var hiketrail=req.body.hiketrail;
    var biketrail=req.body.biketrail;
    var newTrail = {name:name,           
                         image:image,
                         description:description,
                         dontMiss:dontMiss,
                         star:star,
                         biketrail:biketrail,
                         hiketrail:hiketrail
                         };
              
              
    Trail.findByIdAndUpdate(req.params.id, newTrail,function(err,updatedTrail){
    if(err){                          
     console.log("Something went wrong");}
    else{
    res.redirect("/trails/"+req.params.id);}                   
    });                     
});


//DESTROY trail route - - only user that created trail can delete it and that user needs to be logged in to delete it.
router.delete("/:id",middleware.checkTrailOwnership,function(req,res){    
    Trail.findByIdAndRemove(req.params.id, function(err){
    if(err){                          
     res.redirect("/trails");
    }
    else{
    res.redirect("/trails");
    }                   
    }); 
});



module.exports=router;