import  express from 'express';
import  mongoose from 'mongoose';
import  cors from 'cors';
import  bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import {PORT, mongodb} from './config/index.js';


const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.get('/', (req, res) => res.send('freelancer test app'));


//routes
app.use('/users', userRoutes);



const server =  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>server)
    .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);