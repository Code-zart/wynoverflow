const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema(
  {
    answer: { type: String, required: true },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  },
  { timestamps: true }
);

const Answer = mongoose.model("Answer", AnswerSchema);
module.exports = { Answer };
