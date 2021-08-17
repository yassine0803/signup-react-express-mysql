import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.js";
import imageRoutes from "./routes/image.js";
import { PORT, sqldb } from "./config/index.js";

const app = express();

sqldb.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected...");
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("freelancer test app"));

//routes
app.use("/users", userRoutes);
app.use("/images", imageRoutes);

app.use(express.static("public"));

const server = app.listen(PORT, () =>
  console.log(`Server running on port: ${PORT}`)
);
