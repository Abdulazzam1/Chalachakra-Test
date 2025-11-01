const express = require('express');
const { body } = require('express-validator');
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const router = express.Router();

// GET /api/tasks: Mendapatkan semua tugas
router.get('/tasks', getAllTasks);

// POST /api/tasks: Membuat tugas baru
router.post(
  '/tasks',
  [
    // Validasi: title tidak boleh kosong 
    body('title').notEmpty().withMessage('Title tidak boleh kosong')
  ],
  createTask
);

// PUT /api/tasks/:id: Memperbarui tugas
router.put('/tasks/:id', updateTask);

// DELETE /api/tasks/:id: Menghapus tugas
router.delete('/tasks/:id', deleteTask);

module.exports = router;