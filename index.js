require('dotenv').config()
const express = require("express");
const app = express();
const PORT = 7000;
const mongoose = require('mongoose')
const CustomerRouter = require('./Routes/CustomerRouter')

const DBuri = 'mongodb+srv://moses:test123@emkleff.cmmbyn9.mongodb.net/?retryWrites=true&w=majority'

//Establish A connection to the database...

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
       app.listen(PORT, ()=> {
    console.log('server ruuning...');
});
    } catch (error) {
        console.log(error);
    }
};
connectDB();

// Middleware

app.use(express.json())

const requestLogger = (req, res, next) => {
    const Logger = {
        url: req.url,
        method: req.method,
        year: new Date().getFullYear(),
    };
    console.log(Logger);
    next();
}
app.use(requestLogger);

const auth = (req, res, next) => {
    const isLoggedIn = false;
    if(isLoggedIn) {
        next();
    } else {
        res.status(401).send("<h1>NOT AUTHORIZED</h1>");
    }
};
// LINKING TO THE CUSTOMER ROUTES/ROUTER

app.use('/api/Customers', CustomerRouter);

//Responses and Routes

app.get ("/", (req, res) => {
     res.status(200).send("<h1>HOME PAGE</h1>");
});


app.get ("/Dashboard", auth, (req, res) =>{
    res.status(200).send("<h1>DASHBOARD</h1>")
})
app.get ("/contact", (req, res) => {
    res.status(200).send("<h1> CONTACT FORM</h1>")
});

app.get ("/contact-us", (req, res) => {
    res.redirect("/contact");
});

//Error Routes

app.get ("*", (req, res)=> {
    res.status(404).send(`<h1>HOME PAGE</h1> <a href= "/">HOME PAGE</a>`)
})



