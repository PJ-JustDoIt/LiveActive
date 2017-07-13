

var mongoose   = require('mongoose'),
    Trail = require("./models/trail_comments"),
    Comment    = require("./models/comment_comments");

// an array of seed trails
var data=[
      {name:"Yosemite",
      image:"http://www.playfresno.org/images/places/Yosemite%20Valley.JPG",
      description: " Designated a World Heritage Site in 1984, Yosemite is internationally recognized for its granite cliffs, waterfalls, clear streams, giant sequoia groves, lakes, mountains, glaciers, and biological diversity.[8] Almost 95% of the park is designated wilderness.[10] Yosemite was central to the development of the national park idea. First, Galen Clark and others lobbied to protect Yosemite Valley from development, ultimately leading to President Abraham Lincoln's signing the Yosemite Grant in 1864. Later, John Muir led a successful movement to establish a larger national park encompassing not just the valley, but surrounding mountains and forests as well—paving the way for the United States national park system." 
      },
      
     {name:"GrandCanyon",
      image:"http://www.thecanyon.com/assets/css/images/grandcanyon1.jpg",
      description: "Unique combinations of geologic color and erosional forms decorate a canyon that is 277 river miles (446km) long, up to 18 miles (29km) wide, and a mile (1.6km) deep. Grand Canyon overwhelms our senses through its immense size " 
      }
];   




function seedDB(){
    
// clears all trails from db     
  Trail.remove({},function(err){
    if(err)
     {console.log("couldn't clear db");}
    else
     {console.log("cleared db");} 
     
     //create new trail 
    data.forEach(function(seed){            
      Trail.create(seed  , function(err,trail){
        if(err)
         {console.log("Something went wrong");}
        else
         {console.log("New Trail created ");
         // creates new comments for each trail 
         Comment.create(
             {text:"I've been to this one . It's beautiful!",
              author : "Homer"     
             },function(err,comment){
                 if(err)
                  {console.log("comment not created");}
                 else
                  {trail.comments.push(comment);
                   trail.save();
                   console.log("created new comment");
                  }  
             });
          }               
    });     
  });
});
};  





module.exports=seedDB;