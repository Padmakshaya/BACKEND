const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* MongoDB Connection */
mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Mongo Error:", err));

/* Routes */
const bookRoutes = require("./routes/bookRoutes");

app.use("/books", bookRoutes);

/* Server */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

