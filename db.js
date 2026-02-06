const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoUri);   

        console.log('connected to database');
    } catch (error) {
        console.error('error connecting to database', error);
    }       
}
module.exports = connectToDatabase;