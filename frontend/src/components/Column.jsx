import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const Column = ({ columnName, tasks, onDelete }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: columnName,
  });

  const style = {
    display: 'flex',
    flexDirection: 'column',
    margin: '8px',
    width: '300px',
    backgroundColor: isOver ? '#CDE8FF' : '#EBECF0', // Warna abu-abu, highlight biru
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
  };

  const tasksStyle = {
    padding: 8,
    flexGrow: 1,
    minHeight: '100px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h2 style={{ padding: '16px 16px 0 16px', margin: 0 }}>{columnName}</h2>
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div style={tasksStyle}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={onDelete} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;