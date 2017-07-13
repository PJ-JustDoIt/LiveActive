
var express=require("express");
var router =express.Router({mergeParams:true});   
var Trail=require("../models/trail_comments");
var Comment=require("../models/comment_comments");
var middleware=require("../middleware/index_comments.js");

router.use(express.static('public'));



// NESTED CREATE ROUTE for posting comments for a trail                    
router.post("/",middleware.isLoggedIn, function(req,res){            // isLoggedIn middleware code protects an unauthenticated user from adding a comment
    var text=req.body.text;
    // var author=req.body.author; 
    var newComment = {  text:text };

    Trail.findById(req.params.id,function(err,trail){
        if(err)
         {console.log("error");}
        else
         {  Comment.create(newComment  , function(err,comment){
            if(err){                          
             req.flash("error","Something went wrong");}
            else
            { comment.author.id=req.user._id;                   
              comment.author.username=req.user.username;
              comment.save();
              trail.comments.push(comment);
              trail.save();
              req.flash("success","Successfully added comment");
              res.redirect("/trails/"+trail._id);
            }                 
          });    
         }
         });                         
});

//NESTED NEW ROUTE for posting comments for a trail -  User can leave a comment ONLY if he's logged in 
router.get("/new",middleware.isLoggedIn,function(req,res){   // Add isLoggedIn middleware whenever u need user to have the credentials to view any page .
    
    Trail.findById(req.params.id,function(err,trail){
        if(err)
         {console.log("error");}
        else
         {res.render("comments/new_comments",{trail:trail});}
    });
});



//EDIT comment route - only user that created comment can edit it and that user needs to be logged in to edit it. 
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){        
    Comment.findById(req.params.comment_id,function(err,foundcomment){
        if(err)
         {
             res.redirect("back");
         }
        else
         {  
             res.render("comments/edit_comments",{trailid:req.params.id,comment:foundcomment}); 
         }
    });
});


//UPDATE Comment route - only user that created comment can update it and that user needs to be logged in to update it.
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){     
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment ,function(err,updatedComment){    
    if(err)
    {                          
     res.redirect("back");
    }
    else
    {
     res.redirect("/trails/"+req.params.id);
    }
    });                     
});

//DESTROY Comment route - - only user that created trail can delete it and that user needs to be logged in to delete it.
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){    
    Comment.findByIdAndRemove(req.params.comment_id, function(err){ 
    if(err){                          
     res.redirect("back");
    }
    else{
     req.flash("success","Comment deleted");
     res.redirect("/trails/"+req.params.id);   
    }                   
    }); 
});



module.exports=router;

