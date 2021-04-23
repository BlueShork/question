let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let path = require('path');


let app = express();


app.set('view engine', 'ejs');
app.set('views', 'view');
// Middleware



app.use('/assets/', express.static(path.join(__dirname), '/public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'Flash message',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
}));

app.use(require('./middlewares/flash'));
app.use(require('./middlewares/user'));
// app.use(require('./middlewares/error_script'));


// Routes :
app.get('/', (request, response) => {
    
    
    
    console.log("Page d'accueil");
    response.render(path.join(__dirname, 'views/index.ejs'));
    console.log(request.session);




});

app.get('/users' , (request, response) => {
    let Inscription = require('./models/inscription');
    Inscription.read_user(function(user){
        request.flash('error', 'Test');
        console.log(request.session);
        response.render('show', {user: user});

    });
})

app.get('/login', (request, response) => {
    response.render('login');
})

app.get('/dashboard', (request, response) => {
    response.render('dashboard');
})


// Poste request

app.post('/', (request, response) => {
    if(request.body.message == undefined || request.body.message == ""){
        request.flash('error', "LE messsage est vide bg");
        console.log(request.session);
        response.redirect('/');
    }
    else{
        let Message = require('./models/message');
        Message.create(request.body.message, function(){
            response.redirect('/');
        })
    }





})

app.post('/register', (request, response) => {
    let Inscription = require('./models/inscription');
    Inscription.add(request.body.email, request.body.password, function(error){
        request.flash('success', 'Votre compte à bien été crée');
        response.redirect('/');
    });
});
app.post('/login', (request, response) => {
    let Login = require('./models/login');
    Login.login(request.body.email, request.body.password, function(user){
        if(user.error === undefined){
            // AUcune erreur tout est valide
            request.user(user);
            response.redirect('/dashboard');

        }
        else{
            // Erreur
            request.flash('error', "Le mot de passe ne correspondant");
            response.redirect('/');
        }
       
        
    })
})


app.listen(3000);
