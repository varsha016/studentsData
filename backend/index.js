
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const connectDB = require("./dbConnect/dbConnect");


connectDB();

app.use(cors());

app.use(express.json());


app.use("/api", require("./route/studentRoute"));

const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log(`SERVER RUNNING http://localhost:${PORT}`);
    });
    console.log("Mongo Connected");
});
