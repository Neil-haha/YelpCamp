var express         = require("express"),
    router          = express.Router(),
    Campground      = require("../models/campground"),
    middleware      = require("../middleware");

//index
router.get("/", function(req, res) {
    Campground.find({}, function(err, allcampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allcampgrounds});
        }
    });
});

//create
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var img = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    
    var author = {id: req.user._id, username: req.user.username};
    var newCampground = {name : name, img: img, price: price, description: desc, author: author};
    
    
    Campground.create(newCampground, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            console.log(campground);
        }
    });
    res.redirect("/campgrounds");
});

//new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});


//show
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});   
        }
    })
    
});

//edit
router.get("/:id/edit", middleware.checkCampgroundOwnship, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            res.redirect("back");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    })
});

//update
router.put("/:id", middleware.checkCampgroundOwnship, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedcampground) {
       if(err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    })
    
});

//destroy
router.delete("/:id", middleware.checkCampgroundOwnship, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;