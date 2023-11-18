const mongoose = require('mongoose')
async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database successfully!')
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}

module.exports = { connect }
