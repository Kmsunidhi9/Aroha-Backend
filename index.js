const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const port = 5000;
const mongoose = require('./db');

const app = express();
mongoose();

app.use(cors());

app.get('/', (req, res) =>{
    res.send('hey buddy')
})

// request body type is JSON
app.use(express.json())

// middleware
app.use((err, req, res, next) =>{
    res.status(500).json({
        'status': 500,
        'error message': 'internal server error'
    })
})

//to start the server
app.listen(
port, () => {
    console.log('server started at port 5000'); 
}
)

