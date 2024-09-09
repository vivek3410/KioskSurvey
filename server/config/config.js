require('dotenv').config()
const config = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL

}

module.exports = config

