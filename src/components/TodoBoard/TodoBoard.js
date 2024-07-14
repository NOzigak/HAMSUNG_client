import React, { useState, useEffect } from 'react';
import './TodoBoard.css';
import moment from 'moment';
import { createTodo, getTargetTodo, deleteTodo } from "../../api/StudyGroupAPI";

const TodoBoard = ({ study_id, currentDate }) => {
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTodo, setCurrentTodo] = useState([]);

  useEffect(() => {
    fetchTargetTodoByDate(currentDate);
  }, [currentDate]); 

  const fetchTargetTodoByDate = async (date) => {
    try {
      //console.log("현재 스터디:",study_id);
      setLoading(true);
      const todoData = await getTargetTodo(study_id, moment(date).format("YYYY-MM-DD"));
      console.log("todoData:", todoData);
      if (todoData.status === 200 && Array.isArray(todoData.data)) {
        setCurrentTodo(todoData.data);
        console.log('받은 데이터:', todoData.data);
      } else {
        setCurrentTodo([]);
      }
    } catch (error) {
      console.error('특정 날짜의 일정 조회 실패:', error.message);
      setCurrentTodo([]);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (description.trim() === '') {
      setErrorMessage('빈 내용은 추가할 수 없습니다.');
      return;
    }

    try {
      const addedData = await createTodo(study_id, description, moment(currentDate).format("YYYY-MM-DD"));
      console.log('일정 추가 성공:', addedData);
      fetchTargetTodoByDate(currentDate);
      setDescription('');
      setErrorMessage('');
    } catch (error) {
      console.error('일정 추가 실패:', error.message);
      setErrorMessage(`일정 추가 실패: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDeleteTodo = async (post_id) => {
    //console.log("삭제하려는 post id:", post_id);
    try {
      await deleteTodo(post_id);
      console.log("일정 삭제 성공:", post_id);
      fetchTargetTodoByDate(currentDate); // 삭제 후 목록 갱신
    } catch (error) {
      console.error('일정 삭제 실패:', error.message);
    }
  };

  return (
    <div className="Todo-container">
      <input
        type="text"
        className="todo-input"
        placeholder="내용을 추가해주세요."
        value={description}
        onChange={handleInputChange}
      />
      <button className="add-button" onClick={addTodo}>추가</button>
      {errorMessage && <p className="error-text">{errorMessage}</p>}
      <div className="todo-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          currentTodo.map((todoData) => (
            <div key={todoData.id} className="todo-item">
              {todoData.description}
              <button
                className="delete-button"
                onClick={() => handleDeleteTodo(todoData.id)}
              >
                ❎
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoBoard;
