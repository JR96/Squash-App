var express = require("express");
var router = express.Router();
var User = require("../models/user");
var booking = require("../models/bookings");

router.get("/dashboard", function(req , res) {
    booking.find({}, function (err, users){
        if(err){
            console.log(err)
        }else{
            
             res.render("admin/dashboard", {users:users});
        }
        
    })
   
});

router.get("/users:id" ,function(req, res) {
     User.find({}, function (err, users){
        if(err){
            console.log(err)
        }else{
            
             res.render("admin/users",{users:users})
        }
        
    })
})

// router.put("", function(argument) {
//     boo
//     // body...
// })


router.get("/editUser/:id" ,function(req, res) {
     User.findById(req.params._id, function (err, users){
        if(err){
            console.log(err)
        }else{
            
             res.render("admin/editUsers",{users:users})
        }
  });
        
    });

router.delete("/users",function(req, res){
    User.findByIdAndRemove(req.params.propertyId, function (err) {
        if(err){
            console.log(err);
        }else{
            res.redirect("/users");
        }
    });
});

module.exports = router;