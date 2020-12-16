const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    contributors: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

boardSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
