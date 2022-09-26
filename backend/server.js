const express = require("express");
const notesRouter = require("./routes/notes");
const authRouter = require("./routes/auth");
const swaggerRouter = require("./routes/swagger");
const checkJwt = require("./middlewares/checkJwt");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

//!Middlewares
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//!Routes
app.use("/api/swagger", swaggerRouter);
app.use("/api/notes", checkJwt, notesRouter);
app.use("/api/auth", authRouter);

//!Database & Server Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database Connection Error", error);
  });
