const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const mongoose = require('./db');

const port = 5000;

// connect DB
mongoose();

// start server
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
