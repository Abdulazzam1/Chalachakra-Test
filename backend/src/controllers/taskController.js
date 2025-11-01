const { Task } = require('../../models'); // Import model Task
const { validationResult } = require('express-validator');

// 1. Membuat Task Baru (POST /api/tasks)
exports.createTask = async (req, res, next) => {
  try {
    // Cek hasil validasi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    
    // Buat task baru
    // Status akan otomatis 'To Do' berkat defaultValue di model
    const newTask = await Task.create({ title, description });

    res.status(201).json(newTask);
  } catch (error) {
    next(error); // Lempar error ke error handler
  }
};

// 2. Mendapatkan Semua Tasks (GET /api/tasks)
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      order: [['createdAt', 'ASC']] // Urutkan agar rapi
    });

    // --- POIN KRITIS: Mengelompokkan hasil ---
    // Sesuai permintaan PDF [cite: 23]
    const groupedTasks = tasks.reduce((acc, task) => {
      const status = task.status; // 'To Do', 'In Progress', atau 'Done'
      
      if (!acc[status]) {
        acc[status] = [];
      }
      
      acc[status].push(task);
      return acc;
    }, { "To Do": [], "In Progress": [], "Done": [] }); // Inisialisasi object

    res.status(200).json(groupedTasks);
  } catch (error) {
    next(error);
  }
};

// 3. Memperbarui Task (PUT /api/tasks/:id)
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task
    task.title = title !== undefined ? title : task.title;
    task.description = description !== undefined ? description : task.description;
    task.status = status !== undefined ? status : task.status;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// 4. Menghapus Task (DELETE /api/tasks/:id)
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};