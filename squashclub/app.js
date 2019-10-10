var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy  = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");

var adminRoute = require("./routes/admin"),
    authRuotes = require("./routes/index"),
    bookingRoutes = require("./routes/booking");

//DATABASE CONNECTION
mongoose.connect("mongodb://localhost:27017/squash_club",{useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.use(flash());
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Watching the sunset by the beach while sipping on some Gin & Tonic!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(adminRoute);
app.use(authRuotes);
app.use(bookingRoutes);

app.listen(process.env.PORT,process.env.IP,function(){console.log("Server up")});