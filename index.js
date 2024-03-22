

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const server = express();
const router = require('./Routes/router')
server.use(cors());
require('./DB/connection')
server.use(express.json());
server.use(router);



const PORT = 4000 || process.env.PORT


server.listen(PORT, () => {
    console.log(`Server is up & running on PORT ${PORT}`)
});