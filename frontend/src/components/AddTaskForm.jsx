import React, { useState } from 'react';
import axios from 'axios';

const API_URL = '/api/tasks';

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validasi
    if (!title.trim()) {
      setError('Title tidak boleh kosong'); // [cite: 21]
      return;
    }

    try {
      await axios.post(API_URL, { title, description });
      setTitle('');
      setDescription('');
      onTaskAdded(); // Panggil fungsi refresh di parent
    } catch (error) {
      console.error("Error adding task:", error);
      setError('Gagal menambahkan task. Coba lagi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '16px', backgroundColor: 'white', borderRadius: '4px' }}>
      <h3 style={{marginTop: 0}}>Tambah Tugas Baru</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="title" style={{display: 'block', marginBottom: '4px'}}>Title (Wajib)</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '300px', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="description" style={{display: 'block', marginBottom: '4px'}}>Description (Opsional)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '300px', padding: '8px', minHeight: '60px' }}
        />
      </div>
      <button type="submit" style={{ padding: '10px 15px' }}>Tambah Tugas</button>
    </form>
  );
};

export default AddTaskForm;