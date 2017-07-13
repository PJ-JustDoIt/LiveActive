var mongoose=require('mongoose');

var trailSchema = new mongoose.Schema({                          
    name: String,
    star:String,
    image : String,
    description:String,
    hiketrail:Boolean,
    biketrail:Boolean,
    dontMiss:String,
    author : {
        id:{                                                        
        type:mongoose.Schema.Types.ObjectId,                        
        ref: "User"                                                 
        },
        username:String
            },
    comments : [                                                     
        {type:mongoose.Schema.Types.ObjectId,                        
         ref: "Comment"
        }]  
});

var Trail=mongoose.model("Trail",trailSchema);             

module.exports= Trail;