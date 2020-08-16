const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
  {
    question: { type: String, required: true },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", QuestionSchema);
module.exports = { Question };
