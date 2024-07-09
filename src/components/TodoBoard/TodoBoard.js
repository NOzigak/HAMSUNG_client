import React, { useState, useEffect } from 'react';
import './TodoBoard.css';
import moment from 'moment';
import { createTodo, getTodo, deleteTodo } from "../../api/StudyGroupAPI";

const TodoBoard = ({ value, studyId }) => {
  const [todo, setTodo] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment(value).format("YYYY-MM-DD"));
  const [currentTodo, setCurrentTodo] = useState([]);

  useEffect(() => {
    // 현재 날짜의 일정을 불러옴
    fetchTodoByDate(currentDate);
  }, [currentDate]);

  const fetchTodoByDate = async (due_date) => {
    try {
      setLoading(true);
      const todoData = await getTodo(studyId, due_date);
      if (todoData.status === "200 OK") {
        setCurrentTodo(todoData.data);
      } else {
        setCurrentTodo([]);
      }
    } catch (error) {
      console.error('일정 조회 실패:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = async () => {
    if (inputValue.trim() === '') {
      setErrorMessage('빈 내용은 추가할 수 없습니다.');
      return;
    }

    const newTodoList = {
      ...todo,
      [currentDate]: [...(todo[currentDate] || []), inputValue]
    };
    setTodo(newTodoList);
    setInputValue('');
    setErrorMessage('');

    //try {
    //  const todoData = await createTodo({
    //    type: "schedule",
    //    due_date: currentDate,
    //    description: inputValue,
    //    study_id: studyId
    //  });
    //  console.log('일정 추가 성공:', todoData);
      // 일정 추가 후 해당 날짜의 일정 다시 불러오기
    //  fetchTodoByDate(currentDate);
    //} catch (error) {
    //  console.error('일정 추가 실패:', error.message);
    //}
   };

  //const handleDeleteTodo = async (index) => {
  //  const updatedTodoList = {
  //   ...todo,
  //    [currentDate]: todo[currentDate].filter((_, i) => i !== index)
  //  };
  //  setTodo(updatedTodoList);

  //  try {
  //    await deleteTodo(currentDate, index);
  //    console.log('일정 삭제 성공:', index);
      // 삭제 후 해당 날짜의 일정 다시 불러오기
  //    fetchTodoByDate(currentDate);
  //  } catch (error) {
  //    console.error('일정 삭제 실패:', error.message);
  //  }
  //};

  const handleDateChange = (newValue) => {
    setCurrentDate(moment(newValue).format("YYYY-MM-DD"));
  };

  return (
    <div className="Todo-container">
      <div className="currentDate">
        {moment(value).format("YYYY년 MM월 DD일")}
      </div>
      <input
        type="text"
        className="todo-input"
        placeholder="내용을 추가해주세요."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="add-button" onClick={addTodo}>추가</button>
      {errorMessage && <p className="error-text">{errorMessage}</p>}
      <div className="todo-list">
        {/*
        {loading ? (
         <p>Loading...</p>
        ) : (
          currentTodo.map((todoItem, index) => (
           <div key={index} className="todo-item">
              {todoItem.description}
              <button
                className="delete-button"
                //onClick={() => handleDeleteTodo(index)}
                >
                ❎
              </button>
            </div>
          ))
        )} */}
      </div>
    </div>
  );
};

export default TodoBoard;
