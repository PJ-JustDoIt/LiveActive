// all middleware goes here
var middlewareObj={};
var Comment    = require("../models/comment_comments");
var Trail = require("../models/trail_comments");



middlewareObj.checkCommentOwnership = function(req,res,next){                            // Authorization : if user curretly logged in is the same as owner of comment and hence can modify /delete comment. 
        if(req.isAuthenticated()){                                                       // for making sure only if u've logged in , you can proceed 
            Comment.findById(req.params.comment_id).exec(function(err,foundComment){ 
            if(err)
                 {   req.flash("error","Comment not found");
                     res.redirect("back");}
            else
                 {   
                     if(foundComment.author.id.equals(req.user._id))                 
                     {                                                                   // to make sure the user who's trying to edit is the same user that created the comment . 
                      next();
                     }
                     else
                     { 
                      req.flash("error","You don't have permissions to do that");
                      res.redirect("back");   
                     }
                 }           
             });
         }else
             {
               req.flash("error","You need to be logged in to do that");
               res.redirect("back");                             // previous page
             }                           
}






middlewareObj.checkTrailOwnership = function(req,res,next){                        // This is authorization : if user curretly logged in is the same as owner of trail and hence can modify /delete trail. 
        if(req.isAuthenticated()){                                                      // for making sure only if u've logged in , you can proceed 
            Trail.findById(req.params.id).exec(function(err,foundTrail){ 
            if(err)
                 {
                    req.flash("error","Trail not found");
                    res.redirect("back");
                 }
            else
                 {   
                     if(foundTrail.author.id.equals(req.user._id))                 
                     {                                                                  // to make sure the user who's trying to edit is the same user that created the trail . 
                      next();
                     }
                     else
                     {
                      req.flash("error","You don't have permission to do that");                         
                      res.redirect("back");   
                     }
                 }           
             });
         }else
             {   req.flash("error","You need to be logged in to do that");          
                 res.redirect("back");                             
                 
             }                        
}




//middleware
middlewareObj.isLoggedIn = function(req,res,next){                                      // This is authentication ie., if user / passwd confirms with what's in database
    if (req.isAuthenticated()){             
        return next();
    }
    req.flash("error","Please Login to do that !");                 
    res.redirect("/login");
}



module.exports = middlewareObj;