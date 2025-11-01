import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Array warna dari Figma Anda
const cardColors = ['#6A6DCD', '#D93535', '#35D9A0', '#D9A035'];

const TaskCard = ({ task, index, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  // Pilih warna secara bergantian
  const color = cardColors[index % cardColors.length];

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    userSelect: 'none',
    padding: '24px', // Style dari Figma
    margin: '0 0 16px 0', // Menggunakan gap 16px
    backgroundColor: color, // Warna dinamis
    color: 'white', // Teks putih dari Figma
    borderRadius: '8px', // Radius dari Figma
    boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.08)', // Shadow dari Figma
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '320px', // Lebar 320px dari Figma
    boxSizing: 'border-box',
    ...attributes.style, // Selalu tambahkan ini untuk dnd-kit
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Mencegah drag saat mengklik tombol
    if (window.confirm(`Yakin ingin menghapus task: "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ flexGrow: 1, paddingRight: '10px' }}>
        {/* Style teks dari Figma */}
        <h4 style={{ margin: 0, marginBottom: 8, fontSize: '16px', fontWeight: '600' }}>
          {task.title}
        </h4>
        <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255, 255, 255, 0.75)' }}>
          {task.description}
        </p>
      </div>
      <button
        onClick={handleDelete}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)', // Tombol hapus yang lebih pas
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.75)',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer',
          flexShrink: 0, // Mencegah tombol mengecil
        }}
      >
        Hapus
      </button>
    </div>
  );
};

export default TaskCard;