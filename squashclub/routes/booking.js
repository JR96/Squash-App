var express = require("express");
var router = express.Router({mergeParams: true});
var booking = require("../models/bookings");
var newMember = require("../models/newMember");
var User = require("../models/user");
var middleware = require("../middleware")


router.get("/home/:id",(req,res)=>{
   //find id provided from the db
   newMember.findById(req.params.id,function(err,foundMember){
       if(err){
           console.log(err);
       }else{
           //rendering the page
          res.render("shows", {pictures: foundMember}); 
       }
       
   });
});

//POST BOOKING
router.post("/home/:id/booking",middleware.isLoggedIn,function(req,res){
    
    var date = req.body.date,
    time = req.body.time,
    booker = {
        
        id: req.user._id,
        username : req.user.username,
        bookerName: req.user.firstName
    };
    var newBooking = {date: date, time:time, booker:booker};
   
    booking.create(newBooking, function(err, appointment){
        if(err){
            console.log(err);
        }else{
           	req.flash("success","Your booking is for "+date+" between "+time);
           res.redirect("/home/"+req.params.id);
        }
    });
});
            
//RENDERS THE BOOKING PAGE
router.get("/home/:id/booking", middleware.isLoggedIn,function(req, res) {
    newMember.findById(req.params.id,function(err,foundMember){
        if(err){
            console.log(err);
        }
        else{
            res.render("booking/booking", {pictures: foundMember});
        }
    });
});

//EDIT BOOKING
//UPDATE BOOKING



module.exports = router;