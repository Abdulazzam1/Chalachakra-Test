import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import Column from './Column';
import AddTaskForm from './AddTaskForm';

// URL API Backend Anda
const API_URL = 'http://localhost:4000/api/tasks';

const Board = () => {
  const [columns, setColumns] = useState({
    "To Do": [],
    "In Progress": [],
    "Done": []
  });

  // Fungsi untuk mengambil data dari API
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = {
        "To Do": response.data["To Do"] || [],
        "In Progress": response.data["In Progress"] || [],
        "Done": response.data["Done"] || [],
      };
      setColumns(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Mengambil data saat komponen pertama kali di-load [cite: 67]
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fungsi untuk menghapus task [cite: 64, 65]
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      fetchTasks(); // Refresh board setelah hapus
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Helper function untuk mencari kolom tempat task berada
  const findColumnOfTask = (taskId) => {
    return Object.keys(columns).find((columnName) =>
      columns[columnName].some((task) => task.id === taskId)
    );
  };

  // Logika saat drag selesai [cite: 63]
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return; // Di-drop di luar area

    const activeId = active.id;
    const overId = over.id;

    const sourceColumn = findColumnOfTask(activeId);
    
    // over.id bisa jadi nama kolom (jika kolom kosong) atau ID task lain
    const destinationColumn = columns[overId] ? overId : findColumnOfTask(overId);

    if (!sourceColumn || !destinationColumn) return;

    // --- Optimistic Update ---
    // Update state FE dulu agar instan
    const activeTask = columns[sourceColumn].find(t => t.id === activeId);

    if (sourceColumn === destinationColumn) {
      // (Opsional: Handle re-ordering di dalam kolom yang sama)
      // Untuk tes ini, jika kolomnya sama, kita bisa abaikan
      return;
    }

    // Pindah ke kolom baru
    const newSourceTasks = columns[sourceColumn].filter(t => t.id !== activeId);
    const newDestinationTasks = [...columns[destinationColumn], activeTask];

    setColumns({
      ...columns,
      [sourceColumn]: newSourceTasks,
      [destinationColumn]: newDestinationTasks
    });

    // --- Kirim Update ke API ---
    try {
      await axios.put(`${API_URL}/${activeId}`, {
        status: destinationColumn // "In Progress", "Done", etc.
      });
      // Refresh data dari server agar sinkron
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
      // Rollback jika gagal
      fetchTasks();
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Hanya mulai drag jika mouse bergerak 8px
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      {/* Form Tambah Tugas [cite: 54, 57] */}
      <AddTaskForm onTaskAdded={fetchTasks} /> 
      
      {/* Tampilan Board [cite: 51, 52, 53] */}
      <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        {Object.entries(columns).map(([columnName, tasks]) => (
          <Column
            key={columnName}
            columnName={columnName}
            tasks={tasks}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default Board;