const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const ejsmate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');





// imported models
const Student = require('./models/student');
const User = require('./models/user')
const Project = require('./models/project');
const catchAsync = require('./functions/catchAsync');
const AppError = require('./functions/AppError');
const { error } = require('console');


mongoose.connect('mongodb://localhost:27017/erp')
    .then(() => {
        console.log("CONNECTION NOW OPEN!");
    })
    .catch(err => {
        console.log("Critical ERROR!");
        console.log(err);
    });

app.engine('ejs', ejsmate)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


const sessionConfig = {
    secret: 'ehhh!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // security feature 
        // httponly: prevents the cookie from being accessed through client side script 
        httpOnly: true,
        //session time of only and hour
        expires: Date.now() + 1000 * 60 * 60 * 1,
        maxAge: + 1000 * 60 * 60 * 1,
    }
}


app.use(session(sessionConfig));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.loggedUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.get('/home', (req, res) => {
    res.render('home', { session: req.session })
})

app.post('/home', (req, res) => {
    req.render(req.body)

})

app.get('/login', catchAsync((req, res) => {
    res.render('login')
}));

app.post('/login', passport.authenticate('local', {failureFlash:true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back to Menos');
    res.redirect('/students')
});


app.post('/logout', (req, res) => {

    req.session.destroy();
    res.redirect('/login');
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', catchAsync(async (req, res, next) => {
   try{
    const { email, password, username } = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
   req.flash('success', 'Welcome to Vocational Training Centre!');
   res.redirect('/students');
   } catch (e){
    req.flash('error', e.message);
    res.redirect('signup');
   }
}));



app.get('/students', catchAsync(async (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.flash('error', 'You are not logged in')
        return res.redirect('/login')
    }

    const { category } = req.query;
    if (category) {
        const students = await Student.find({ category: category })
        res.render('students/index', { students, category })
    } else {
        const students = await Student.find({})
        res.render('students/index', { students, category: 'All' })
    }
    const students = await Student.find({})
    res.render('students/index', { students })
}))

app.get('/students/new', catchAsync((req, res, next) => {

    if (!req.isAuthenticated()) {
        req.flash('error', 'You are not logged in')
        return res.redirect('/login')
    }

    const courses =  [ 'cosmetology', 'metal fabrication', 'plumbing and drain laying', 'brick laying',
        'motor mechanics', 'clothing',  'information technology', 'carpentry',  'electrical engineering', 
        'tourism and hospitality'];
    res.render('students/new', { categories });
}))

app.post('/students', catchAsync(async (req, res, next) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    req.flash('success', 'New Student successfully created!');
    res.redirect(`/students/${newStudent._id}`)
}))

app.get('/students/:id', catchAsync(async (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.flash('error', 'You are not logged in')
        return res.redirect('/login')
    }

    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
        req.flash('error', 'Student does not exist');
        return res.redirect('/students');
    }
    res.render('students/show', { student })
}));


//for editing students
app.get('/students/:id/edit', catchAsync(async (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.flash('error', 'You are not logged in')
        return res.redirect('/login')
    }

    const { id } = req.params;
    const courses =  [ 'cosmetology', 'metal fabrication', 'plumbing and drain laying', 'brick laying',
        'motor mechanics', 'clothing',  'information technology', 'carpentry',  'electrical engineering', 
        'tourism and hospitality'];
    const student = await Student.findById(id);
    res.render('students/edit', { student, categories })
}))

app.put('/students/:id', catchAsync(async (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.flash('error', 'You are not logged in')
        return res.redirect('/login')
    }

    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body, { runValidators: true });
    req.flash('success', 'Student successfully updated!');
    res.redirect(`/students/${student._id}`);
}))

app.delete('/students/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    req.flash('success', 'Student successfully deleted!');
    res.redirect('/students');
}))

app.get('/projects/new',  catchAsync((req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You are not logged in')
        return res.redirect('/login')
    }

    const courses =  [ 'cosmetology', 'metal fabrication', 'plumbing and drain laying', 'brick laying',
         'motor mechanics', 'clothing',  'information technology', 'carpentry',  'electrical engineering', 
         'tourism and hospitality'];
    res.render('projects/new', { courses });
}));

// Route: Handle Form Submission & Create a New Project
app.post('/projects',catchAsync(async (req, res) => {
    const newProject = new Project(req.body);
    await newProject.save();
    req.flash('success', 'New Project Created!');
    res.redirect('/projects'); // Redirect to project list 
}));


//Error handling Middle Ware
app.all('*', (req, res, next) => {
    next(new AppError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Error something went wrong' } = err;
    res.status(status).render('error', { error: err });
})

app.listen(4000, () => {
    console.log('Listening on port 4000')
})


