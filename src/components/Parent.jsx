import React, { useState, useEffect } from "react";
import Draggable from "./Draggable";
import './Parent.css';

const Parent = () => {
  const [draggableCount, setDraggableCount] = useState(() => {
    const savedCount = localStorage.getItem("draggableCount");
    return savedCount ? Number(savedCount) : 1;
  });

  useEffect(() => {
    localStorage.setItem("draggableCount", draggableCount);
  }, [draggableCount]);

  const addDraggable = () => {
    setDraggableCount(draggableCount + 1);
  };

  const removeDraggable = () => {
    setDraggableCount(draggableCount - 1);
  };

  return (
    <div>
      <button className="add-remove-btn" onClick={addDraggable}> Add Card </button>
      <button className="add-remove-btn" onClick={removeDraggable}> Remove Card </button>
      <div className="main-draggables">
        {Array(draggableCount)
          .fill(null)
          .map((_, index) => (
            <Draggable key={index} />
          ))}
      </div>
    </div>
  );
};

export default Parent;