module.exports = (app) => {

    const example = require('./controllers/controllerexample');

    //-----------------
    //---- GET HOMEPAGE
    //-----------------
    app.get('/', function(req,res){
        res.render('index',{title: 'Form Validation', success: req.session.success, errors: req.session.errors});
        req.session.errors = null;
    });

    app.post('/submit', function(req,res){
    //------- check validation
    req.check('email', 'Invalid email').isEmail();
    req.check('password', 'Password is too short').isLength({min: 4});

    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.success = false;
    }else{
        req.session.success = true;
    }
    res.redirect('/');
    });
    //---------------
    //-- POST EXAMPLE
    //---------------

    app.post('/post', example.create)
}