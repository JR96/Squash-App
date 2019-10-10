var express = require("express");
var router = express.Router({mergeParams: true});
var User = require("../models/user");
var newMember = require("../models/newMember");
var passport = require("passport");
var middleware = require("../middleware")
//Index
router.get("/", function(req, res) {
    res.render("landing")
})
router.get("/home",function(req,res){
    //get all members from the db
    newMember.find({},function(err,pictures){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{pictures: pictures, currentUser: req.user});
        }
    });
});

//create
router.post("/signup", middleware.isLoggedIn,function(req,res){
    //get info from form
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   
   var newPic = {name: name, image: image, description: description};
   //create new member and save to db;
   newMember.create(newPic,function(err,newlyCreated){
       if(err){
           console.log(err);
       }else{
             //redirect to home
            res.redirect("/home");
       }
   });
});

//RENDERS ABOUT PAGE
router.get("/about",(req,res)=>{
   res.render("about");
});
router.get("/signup",function(req,res){
    res.render("signup");
});

//shows courts



//AUTHENTICATION ROUTES
router.get("/register", function(req,res){
    res.render("register");
});

//HANDLES REGISTER LOGIC
router.post("/register",function(req,res){
     var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        gender: req.body.gender});
        if(req.body.adminCode === "LocalHost19")
        {
            newUser.isAdmin = true;
        }
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            //console.log(err);
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "Welcome "+user.firstName);
            res.redirect("/");
        });
    });
});
//SHOW LOGIN FORM
router.get("/login",function(req, res) {
    // req.flash("success", "Welcome"+req.user.firstName)
    res.render("login");
});
//AUTHENTICATION
router.post("/login",passport.authenticate("local",{
    successRedirect: "/home",
    failureRedirect: "/login"
}),function(req, res) {
    
});

//LOGOUT LOGIC
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success", "See You Soon :)");
    res.redirect("/");
});

module.exports = router;