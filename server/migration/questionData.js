const mongoose = require('mongoose')
const config = require('../config/config')

async function connectToDatabase() {
    try {
        await mongoose.connect(config.MONGO_URL)
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error("Error connecting to MongoDB: ", e)
        process.exit(1)
    }
}


async function migrateQuestionData() {
    try {
        
    } catch (e) {
        console.log("Error updating data:", e);
    }
}