const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.get('/', (req, res) => res.send('freelance test app'));

const PORT = process.env.PORT || 5000;

const server =  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>server)
    .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);