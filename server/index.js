import  express from 'express';
import  mongoose from 'mongoose';
import  cors from 'cors';
import  bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import imageRoutes from './routes/image.js';
import {PORT, mongodb} from './config/index.js';
import path from 'path';
const __dirname = path.resolve();
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('freelancer test app'));


//routes
app.use('/users', userRoutes);
app.use('/images', imageRoutes);

app.use(express.static("public"))


const server =  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>server)
    .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);