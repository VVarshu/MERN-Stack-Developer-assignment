const express = require("express");
const router = express.Router();
const Agent = require("../model/Agent");
const Task = require('../model/Task');


// ============================
// Add New Agent
// ============================
router.post("/add", async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    // Validation
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if agent already exists
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    const agent = new Agent({
      name,
      email,
      mobile,
      password,
    });

    await agent.save();

    res.status(201).json({
      message: "Agent created successfully",
      agent: {
        _id: agent._id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// ============================
// Get All Agents with Task Count
// ============================

router.get('/', async (req, res) => {
  try {
    const agents = await Agent.find();

    const agentsWithTaskCount = await Promise.all(
      agents.map(async (agent) => {
        const taskCount = await Task.countDocuments({
          assignedTo: agent._id
        });

        return {
          ...agent._doc,
          taskCount
        };
      })
    );

    res.json(agentsWithTaskCount);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
