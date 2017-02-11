var mongoose = require("mongoose");


var campgroundScheme = new mongoose.Schema({
   name : String,
   img : String,
   price: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
       }
    ]
});

module.exports = mongoose.model("Campground", campgroundScheme);