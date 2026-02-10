/** * This is the entry point of the application. It loads environment variables,
 * connects to the database, and starts the Express server.
 */

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
