var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"); 
    
var data = [
        { 
            name: "Mountain", 
            img: "http://img01.baimao.com/M00/39/B7/wKgAFFPE0ZaALpDEAAXFq5CcDdw469.jpg",
            description: "jlafjkljsflalkfjsafjkjakljfljkjaljkdjljfpqjfp ljqljl jlf jkqj ljqlkjlkja jkjalkfjla jj ljqf jiqjlei ljljflqj kljeljljqkj leqj lkejeqjflkeq, j,n ,nz,mvnznjdfjkl "
        }, 
        {
            name: "Mountain2",
            img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1487306137&di=9b81cdd5b450019cfe4f9249a370d8f2&imgtype=jpg&er=1&src=http%3A%2F%2Fs9.sinaimg.cn%2Fmiddle%2F49993ba7gb1231bd7ae08%26amp%3B690",
            description: "jlafjkljsflalkfjsafjkjakljfljkjaljkdjljfpqjfp ljqljl jlf jkqj ljqlkjlkja jkjalkfjla jj ljqf jiqjlei ljljflqj kljeljljqkj leqj lkejeqjflkeq, j,n ,nz,mvnznjdfjkl "
        },
        {
            name: "Lake",
            img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1487306177&di=5a3d2f84f96981b1eb1ba438e62ecd07&imgtype=jpg&er=1&src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F15951%2F15950424.jpg",
            description: "jlafjkljsflalkfjsafjkjakljfljkjaljkdjljfpqjfp ljqljl jlf jkqj ljqlkjlkja jkjalkfjla jj ljqf jiqjlei ljljflqj kljeljljqkj leqj lkejeqjflkeq, j,n ,nz,mvnznjdfjkl "
        }
    ];

function seedDB() {
    //remove all campgrounds
    Campground.remove({}, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("campground has been removed!");
            //add new campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment) {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log("created new comment");
                                campground.comments.push(comment);
                                campground.save();
                            }
                        })
                }
            })
        });
    }
    });
}

module.exports = seedDB;