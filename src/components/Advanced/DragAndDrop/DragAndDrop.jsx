import { useState } from 'react';
import './style.css';
const DragAndDrop = () => {
  const [widgets, setWidgets] = useState([]);
  const [draggableWidgets, setDraggableWidgets] = useState([
    {
      name: 'Widget A',
      type: 'type-a',
    },
    {
      name: 'Widget B',
      type: 'type-b',
    },
    {
      name: 'Widget C',
      type: 'type-c',
    },
    {
      name: 'Widget D',
      type: 'type-d',
    },
  ]);
  const handleDrag = (e, type) => {
    e.dataTransfer.setData('draggableWidgets', type);
  };
  // for the widgets enabling handle drop and drag
  const handleOnDrop = (e) => {
    const draggedWidgets = e.dataTransfer.getData('draggableWidgets');
    setWidgets([...widgets, draggedWidgets]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="main-container">
      <div className="draggables-container draggables">
        {draggableWidgets?.map((widget, index) => {
          const { name, type } = widget;
          return (
            <div
              key={index}
              className="widget"
              onDragStart={(e) => handleDrag(e, name)}
              draggable
            >
              {name}
            </div>
          );
        })}
      </div>
      <div
        className="draggable-destination draggables"
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
      >
        {widgets?.map((widget, index) => {
          return (
            <div className="dropped-widget" key={index}>
              {widget}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DragAndDrop;
