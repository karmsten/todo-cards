import React, { useState, useRef, useEffect} from "react";
import "./Draggable.css";

const Draggable = ({ id }) => {
  const [inputValue, setInputValue] = useState("");
  const [listElements, setListElements] = useState(
    JSON.parse(localStorage.getItem(`draggable-${id}-listElements`)) || []);
  const [selectedElement, setSelectedElement] = useState(null);
  const [checkedCount, setCheckedCount] = useState(0);
  const [checkedList, setCheckedList] = useState([]);

  useEffect(() => {
    localStorage.setItem(`draggable-${id}-listElements`, JSON.stringify(listElements));
  }, [listElements, id]);

  useEffect(() => {
    setListElements([]);
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setListElements([...listElements, inputValue]);
    setInputValue("");
  };

  const handleDeleteButtonClick = () => {
    setListElements(
      listElements.filter((_, index) => !checkedList.includes(index))
    );
    setCheckedList([]);
    setCheckedCount(0);
  };

  const handleCheckboxChange = (index) => {
    if (checkedList.includes(index)) {
      setCheckedList(checkedList.filter((i) => i !== index));
    } else {
      setCheckedList([...checkedList, index]);
    }
  };

  return (
    <div className="draggable-window">
      <div className="draggable-content">
        <ul>
          {listElements.map((element, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={checkedList.includes(index)}
                onChange={() => handleCheckboxChange(index)}
              />
              {element}
            </li>
          ))}
        </ul>
        {checkedList.length > 0 ? (
          <button className="footer-btn1" onClick={handleDeleteButtonClick}>
            Delete
          </button>
        ) : null}
      </div>
      <div className="draggable-footer">
        <input
          type="text"
          placeholder="Add task"
          value={inputValue}
          onChange={handleInputChange}
        ></input>
        <button className="footer-btn1" onClick={handleButtonClick}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Draggable;
