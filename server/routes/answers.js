const router = require("express").Router({ mergeParams: true });
const { Question } = require("../db/models/question");
const { Answer } = require("../db/models/answer");
const question = require("../db/models/question");

/**
 * Post an answer to a specific question
 * POST /api/questions/:qId/answers/
 */
router.route("/").post((req, res) => {
  // build the new answer document
  const newAnswer = new Answer(req.body);
  newAnswer.question = req.params.qId;
  // find the document of the question this answer belongs to
  return Question.findById(req.params.qId).then((question) => {
    newAnswer
      .save()
      .then((createdAnswer) => {
        // Add the newly created answer _id value to the Question document
        question.answers.push(createdAnswer._id);
        question
          .save()
          .then(res.json(createdAnswer))
          .catch((err) => res.status(500).json("Error: ", err));
      })
      .catch((err) => res.status(500).json("Error: ", err));
  });
});

/**
 * Get all of the answers to a specific question
 * GET /api/questions/:qId/answers/
 */
router.route("/").get((req, res) => {
  Question.findById(req.params.qId)
    .populate("answers")
    .exec()
    .then((questionWithAnswers) => {
      res.json(questionWithAnswers);
    })
    .catch((err) => res.status(500).json("Error: ", err));
});

module.exports = router;
