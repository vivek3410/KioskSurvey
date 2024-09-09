const express = require('express')
const cors = require('cors')
const config = require('./config/config')
const surveyRoutes = require('./routes/survey.routes')
require('./config/mongoose')


const app = express()

app.use(express.json())

app.use(cors())

app.use('/api/survey', surveyRoutes)


app.listen(config.PORT, () => {
    console.log(`Server listening on ${config.PORT}`);
})