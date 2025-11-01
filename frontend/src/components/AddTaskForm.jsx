import React, { useState } from 'react';
import axios from 'axios';

const API_URL = '/api/tasks'; // Pastikan ini sudah /api/tasks

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) {
      setError('Title tidak boleh kosong');
      return;
    }
    try {
      await axios.post(API_URL, { title, description });
      setTitle('');
      setDescription('');
      onTaskAdded();
    } catch (error) {
      console.error("Error adding task:", error);
      setError('Gagal menambahkan task. Coba lagi.');
    }
  };

  // Style untuk form dark mode (dari style kolom)
  const formStyle = {
    marginBottom: '32px',
    padding: '24px',
    backgroundColor: '#262626',
    borderRadius: '16px',
    maxWidth: '368px', // Menyamakan lebar dengan kolom
    margin: '0 auto 32px auto', // Pusatkan form
    boxSizing: 'border-box',
  };
  
  // Style untuk input
  const inputStyle = {
    width: '100%',
    padding: '8px',
    backgroundColor: '#333',
    color: 'white',
    border: '1px solid #555',
    borderRadius: '4px',
    boxSizing: 'border-box' // Agar padding tidak merusak lebar
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3 style={{ marginTop: 0, color: 'white', fontSize: '24px' }}>Tambah Tugas Baru</h3>
      {error && <p style={{ color: '#D93535' }}>{error}</p>}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="title" style={{ display: 'block', marginBottom: '4px', color: 'rgba(255, 255, 255, 0.75)' }}>Title (Wajib)</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="description" style={{ display: 'block', marginBottom: '4px', color: 'rgba(255, 255, 255, 0.75)' }}>Description (Opsional)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }}
        />
      </div>
      <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#6A6DCD', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
        Tambah Tugas
      </button>
    </form>
  );
};

export default AddTaskForm;