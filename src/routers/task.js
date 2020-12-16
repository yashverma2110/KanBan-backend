const express = require("express");
const Task = require("../models/task");

const router = new express.Router();
const auth = require("../middleware/auth");
const { findByIdAndUpdate } = require("../models/task");

router.post("/add/task", auth, async (req, res) => {
  try {
    req.body.contributors.push({ _id: req.user._id, name: req.user.name });
    const task = new Task({ ...req.body, owner: req.query.id });
    await task.save();
    res.status(201).send({ task });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/get/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      status: req.query.status,
      owner: req.query.id,
    });
    res.status(201).send({ tasks });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/get/task", auth, async (req, res) => {
  try {
    const task = await Task.find({ _id: req.query.id });
    res.json({ task });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/update/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).send({ task });
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
