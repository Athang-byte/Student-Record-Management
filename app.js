import express from 'express';
import route from './routes/route.js';
import connectDB from './db/db.js';
import bodyParser from 'body-parser';
const DATABASEURL= process.env.DATABASEURL||'mongodb://127.0.0.1:27017'
const app= express();
const port = 3000;


// ejs setup
app.set('views','./views');
app.set('view engine','ejs');

app.use(bodyParser.urlencoded())



// database connection
connectDB(DATABASEURL)

//route use
app.use('/',route);

app.listen(port,()=>{
    console.log(`Server is running: http://localhost:${port}`)
})  