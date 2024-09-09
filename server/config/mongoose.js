const { default: mongoose } = require("mongoose");
const config = require("./config");


mongoose.connect(config.MONGO_URL).then(() => {
    console.log("MongoDB Connected successfully");
}).catch((e) => {
    console.error("Error connecting to MongoDB", e)
})