const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const connectToMongo = require('./connection/dbConfig');

app.use(bodyparser.json());

require('dotenv').config();
app.use(express.json());
app.use(cors());
connectToMongo();

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.use('/api/user',require('./routes/users'))
app.use('/api/diet', require('./routes/diet'))

app.listen(PORT, () =>{ 
    console.log("App is listening on port ",PORT);
})
