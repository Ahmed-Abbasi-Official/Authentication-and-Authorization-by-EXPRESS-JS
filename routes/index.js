var express = require('express');
var router = express.Router();
const userModel=require('./users')
const passport=require('passport')

const localStrategy=require('passport-local')

passport.use(new localStrategy(userModel.authenticate()))


router.get('/',(req,res)=>{
  res.render('index')
})



                                // ==========================
                                //        Profile Route's
                                // ==========================




router.get('/profile',isLoggedIn,(req,res)=>{
  console.log(req.user.username);
  
  res.render('profile',{'name':req.user.username})
})



                                // ==========================
                                //      Register Route's
                                // ==========================




router.post('/register', (req, res) => {
  var userData = new userModel({
    username: req.body.username,
    secret: req.body.secret,
  });

  userModel.register(userData, req.body.password)
    .then((registeredUser) => {
      passport.authenticate('local')(req, res, () => {
        res.redirect('/profile');
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
});








                                // ==========================
                                //        Login Route's
                                // ==========================





router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/'
}),function(req,res){})




                                // ==========================
                                //        LogOut Route's
                                // ==========================



router.get('/logout',(req,res,next)=>{
  req.logout((error)=>{
    if(error) return next(error) ;
    res.redirect('/')
  })
})


                                // ==========================
                                //        isLogged In
                                // ==========================



function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
}

module.exports = router;
