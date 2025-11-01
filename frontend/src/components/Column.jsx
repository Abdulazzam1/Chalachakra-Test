import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const Column = ({ columnName, tasks, onDelete }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: columnName,
  });

  // Style kolom dari Figma
  const style = {
    display: 'flex',
    flexDirection: 'column',
    margin: '8px',
    padding: '24px',
    backgroundColor: isOver ? '#333333' : '#262626', // Warna #262626 dari Figma
    borderRadius: '16px', // Radius dari Figma
    gap: '16px', // Gap 16px dari Figma
    width: '368px', // Lebar 320px (card) + 48px (padding)
    boxSizing: 'border-box',
  };

  const tasksContainerStyle = {
    flexGrow: 1,
    minHeight: '100px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* Judul kolom dari Figma */}
      <h2 style={{ padding: 0, margin: 0, color: 'white', fontSize: '37px', fontWeight: '700' }}>
        {columnName}
      </h2>
      
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div style={tasksContainerStyle}>
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} onDelete={onDelete} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;