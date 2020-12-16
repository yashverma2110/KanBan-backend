const express = require("express");
const Board = require("../models/board");

const router = new express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/task");

router.get("/get/boards", auth, async (req, res) => {
  try {
    const boards = await Board.find({
      contributors: { $elemMatch: { name: req.user.name } },
    }).sort({ createdAt: -1 });
    res.json({ boards });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/get/board/:id", auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    res.json({ board });
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post("/add/board", auth, async (req, res) => {
  if (!req.body.contributors) req.body.contributors = [];
  req.body.contributors.push({ name: req.user.name, _id: req.user.id });
  const board = new Board({
    ...req.body,
  });

  try {
    await board.save();
    res.status(201).json({ board });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/update/board/:id", auth, async (req, res) => {
  try {
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    const tasks = await Task.find({ owner: board._id });
    let temp = req.body.contributors.map((user) => user._id);
    tasks.forEach(async (task) => {
      task.contributors = task.contributors.filter((user) =>
        temp.includes(user._id)
      );
      await task.save();
    });
    res.json({ board });
  } catch (e) {
    res.status(404).send();
  }
});

router.delete("/board/delete/:id", auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board || board.owner.toString() !== req.user._id.toString()) {
      throw new Error("Something went wrong");
    }
    await Board.findByIdAndDelete(req.params.id);
    res.json(board);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
