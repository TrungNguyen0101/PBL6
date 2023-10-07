const {print, OutputType} = require("../../helpers/print.js")
const mongoose = require('mongoose')
async function connect() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        print('Connected to the database successfully!', OutputType.SUCCESS)
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}

module.exports = { connect }
