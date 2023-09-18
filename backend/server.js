import express from "express";
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
const app = express();
import routes from "./routes";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";

// Database connection

mongoose.connection.on('connected', () => {
    console.log(`DB Connected [${DB_URL}]`);
});

mongoose.connection.on('disconnected', () => {
    console.log('DB Disconnected ..x..x..x..');
});

const connect = async () => {
    try {
        await mongoose.connect(DB_URL);
    } catch (error) {
        console.log(error);
    }
};

connect()
global.appRoot = path.resolve(__dirname);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));
app.use("/", (req, res) => {
  res.send(`
  <h1>Welcome to E-commerce Rest APIs</h1>
  You may contact me <a href="https://codersgyan.com/links/">here</a>
  Or You may reach out to me for any question related to this Apis: codersgyan@gmail.com
  `);
});

app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
