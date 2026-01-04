const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

/* CREATE */
router.post("/add", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/* READ */
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

/* UPDATE */
router.put("/update/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Book updated", book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/* DELETE */
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
});

module.exports = router;
