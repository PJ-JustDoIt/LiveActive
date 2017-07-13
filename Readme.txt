App provides a view of several trails posted by users. A user can add their comments for existing trails and create new trails.

Features ( Refer ./routes/*.js ): 
---------------------------------
A) Trails :
-----------------
Level 1 : Anyone can view trails ( without logging in )
Level 2:  Only users who are logged in can create a new trail
          Only users who created a trail (ie. owners ) can update or delete it. The edit and delete buttons in a trail will be shown only for the trail owner. 

B) Comments: 
------------
Level 1 : Anyone can view comments ( without logging in )
Level 2 ( authentication ) : Only if a user is logged in , he / she can create a new comment for any trail
Level 3 ( authorization ) : User can edit/destroy only his /her own comment
Level 3 ( authorization ) : User will see edit/delete buttons on comments he has created for any trail and he can see these buttons only when he's logged in


App uses :
-----------
html, css, javascript , bootstrap, Node.js (Express) , RESTful Routes , MongoDB, Passportjs. 

To run the app : 
----------------
- In command line , type --> node app_comments.js. Needs mongod to be run 
- To play around : Some users have been created : login/password: abc/abc3 , def/def3 , ghi/ghi3 , jkl/jkl3
- App will also be pushed into Heroku wth Git 