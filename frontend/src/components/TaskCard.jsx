import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({ task, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    userSelect: 'none',
    padding: 16,
    margin: '0 0 8px 0',
    backgroundColor: '#FFFFFF',
    color: 'black',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Mencegah drag saat mengklik tombol hapus
    if (window.confirm(`Yakin ingin menghapus task: "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>
        <h4 style={{ margin: 0, marginBottom: 8 }}>{task.title}</h4>
        <p style={{ margin: 0, fontSize: '14px' }}>{task.description}</p>
      </div>
      <button 
        onClick={handleDelete}
        style={{
          backgroundColor: 'red', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer'
        }}
      >
        Hapus
      </button>
    </div>
  );
};

export default TaskCard;