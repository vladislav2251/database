const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/errorHandler.js");

// routes
const authRoutes = require("./routes/authRoute.js");

const app = express();
const PORT = process.env.PORT || 6000;
const dbConnect = require("./config/dbConnect.js");

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", authRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server working on http://localhost:${PORT}`);
});