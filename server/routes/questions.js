const router = require("express").Router();

const { Question } = require("../db/models/question");

// Post a new question to WynOverflow
// POST /api/questions/
// Request body:
// { "question": "sample question"}
router.route("/").post((req, res) => {
  const question = new Question(req.body);
  question
    .save()
    .then((question) => res.status(201).json(question))
    .catch((err) => res.status(500).json("Error: ", err));
});

// Get all questions to WynOverflow
// GET /api/questions/
router.route("/").get((req, res) => {
  Question.find()
    .then((questions) => res.json(questions))
    .catch((err) => res.status(500).json("Error: ", err));
});

// Delete a specific question from WynOverflow
// DELETE /api/questions/:id/
router.route("/").delete((req, res) => {
  Question.findByIdAndRemove(req.params.id)
    .then((question) => {
      if (!question) {
        return res.status(404).json({ error: "task not found" });
      }
      res.status(204).json(question);
    })
    .catch((err) => res.status(500).json("Error: ", err));
});

module.exports = router;
