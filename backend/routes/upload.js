// routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const xlsx = require('xlsx');

const Agent = require('../model/Agent');
const Task = require('../model/Task');   // ✅ Proper model import

const upload = multer({ dest: 'uploads/' });

// Upload route
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Validate file type
    const allowedExtensions = ['.csv', '.xlsx', '.xls'];
    const ext = file.originalname
      .slice(file.originalname.lastIndexOf('.'))
      .toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      fs.unlinkSync(file.path);
      return res.status(400).json({ message: 'Invalid file type' });
    }

    let tasks = [];

    // ================= CSV FILE =================
    if (ext === '.csv') {
      fs.createReadStream(file.path)
        .pipe(csv())
        .on('data', (row) => {
          tasks.push({
            firstName: row.FirstName,
            phone: row.Phone,
            notes: row.Notes,
          });
        })
        .on('end', async () => {
          await distributeTasks(tasks);
          fs.unlinkSync(file.path);

          res.json({
            message: 'Tasks uploaded and distributed successfully',
            totalTasks: tasks.length,
          });
        });
    }

    // ================= XLS / XLSX FILE =================
    else {
      const workbook = xlsx.readFile(file.path);
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(
        workbook.Sheets[sheetName]
      );

      tasks = sheetData.map((row) => ({
        firstName: row.FirstName,
        phone: row.Phone,
        notes: row.Notes,
      }));

      await distributeTasks(tasks);
      fs.unlinkSync(file.path);

      res.json({
        message: 'Tasks uploaded and distributed successfully',
        totalTasks: tasks.length,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ================= DISTRIBUTION LOGIC =================
async function distributeTasks(tasks) {
  const agents = await Agent.find();

  if (!agents.length) {
    throw new Error('No agents available');
  }

  let agentIndex = 0;

  for (let task of tasks) {
    const newTask = new Task({
      ...task,
      assignedTo: agents[agentIndex]._id,
    });

    await newTask.save();

    agentIndex++;

    if (agentIndex >= agents.length) {
      agentIndex = 0; // Loop back (sequential distribution)
    }
  }
}

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
