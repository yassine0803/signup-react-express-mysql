import  express from 'express';
import  mongoose from 'mongoose';
import  cors from 'cors';
import  bodyParser from 'body-parser';
import  dotenv from 'dotenv';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.get('/', (req, res) => res.send('freelance test app'));


//routes
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

const server =  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>server)
    .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);