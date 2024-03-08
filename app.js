const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Placeholder for user data
let users = [];

// Routes
// User Registration
app.get('/', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { email, username, password } = req.body;
    // Check if user already exists
    const userExists = users.find(user => user.username === username || user.email === email);
    if (userExists) {
        return res.status(400).send('User already exists.');
    }
    // Create new user
    const newUser = { email, username, password };
    users.push(newUser);
    res.render("sucesslogin");
});

// User Login
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.render('invalid-login.ejs');

    }
    res.send('Login successful.');
});

// Forgot Password
app.get('/forgot-password', (req, res) => {
    res.render('forgot-password');
});

app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).send('User not found.');
    }
    
    console.log(user);
    res.render('password',{user});

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
