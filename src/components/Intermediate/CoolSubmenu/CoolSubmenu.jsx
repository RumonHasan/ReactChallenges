import React, { useState, useEffect, useRef } from 'react';
import './coolStyles.css';

const CoolSubmenu = () => {
  const [submenu, setSubmenu] = useState([
    {
      id: 0,
      label: 'Home',
      width: 55,
      height: 30,
      deleteState: false,
    },
    {
      id: 1,
      label: 'About',
      width: 55,
      height: 30,
      deleteState: false,
    },
    {
      id: 2,
      label: 'Contact',
      width: 55,
      height: 30,
      deleteState: false,
    },
    {
      id: 3,
      label: 'Services',
      width: 55,
      height: 30,
      deleteState: false,
    },
    {
      id: 4,
      label: 'Website',
      width: 55,
      height: 30,
      deleteState: false,
    },
  ]);
  const refs = useRef([]);
  const spanRefs = useRef([]);

  const handleMenuClick = (refIndex) => {
    const originalWidth = 55;
    const element = refs.current[refIndex];
    const spanElement = spanRefs.current[refIndex].getBoundingClientRect();
    const spanElementWidth = spanElement.width;
    element.style.width = `${originalWidth * 1.5 + spanElementWidth}px`;
    // reveal delete
    let localSub = [...submenu].map((item) => {
      if (item.id === refIndex) {
        return {
          ...item,
          deleteState: true,
        };
      } else {
        return item;
      }
    });
    setSubmenu(localSub);
  };
  const leaveMenuClick = (refIndex) => {
    const element = refs.current[refIndex];
    element.style.width = `55px`;
    let localSub = [...submenu].map((item) => {
      if (item.id === refIndex) {
        return {
          ...item,
          deleteState: false,
        };
      } else {
        return item;
      }
    });
    setSubmenu(localSub);
  };
  const deleteItem = (id) => {
    return setSubmenu((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };
  return (
    <div className="container">
      CoolSubmenu
      <div className="submenu-container">
        {submenu.map((menuItem, index) => {
          const { label, width, height, deleteState, id } = menuItem;
          return (
            <div
              ref={(el) => (refs.current[id] = el)}
              onMouseOver={() => handleMenuClick(id)}
              onMouseLeave={() => leaveMenuClick(id)}
              key={index}
              className="item"
              style={{ width: `${width}px`, height: `${height}px` }}
            >
              <span ref={(element) => (spanRefs.current[id] = element)}>
                {label}
              </span>
              <button
                onClick={() => deleteItem(id)}
                className={deleteState ? 'delete view' : 'delete'}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoolSubmenu;
