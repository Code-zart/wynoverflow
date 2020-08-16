// Loads our fatabase connection
require("./db/config");

const express = require("express");
const morgan = require("morgan");

// here is where we will eventually also requre our routes files
const questionsRouter = require("./routes/questions");
const answersRouter = require("./routes/answers");

const app = express();
app.use(morgan("tiny"));

app.use(express.json());

// here is where we will eventually also give our app access to our routes
app.use("/api/questions", questionsRouter);
app.use("/api/questions/:qId/answers", answersRouter);

module.exports = app;
