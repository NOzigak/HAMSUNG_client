import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from 'redux';
import RootReducer from './reducers/RootReducer';
import {Provider} from 'react-redux';
import { thunk } from 'redux-thunk';

const root = ReactDOM.createRoot(document.getElementById('root'));

const loggerMiddleware = (store) => (next) => (action) => {
  console.log("store", store);
  console.log("action", action);
  next(action);
}
const middleware = applyMiddleware(thunk, loggerMiddleware);
const store = createStore(RootReducer, middleware);

const handleBeforeUnload = (event) => { // 페이지를 닫을 때 전역적으로 토큰을 제거하는 함수
  const confirmationMessage = "정말로 페이지를 떠나시겠습니까?";
  event.returnValue = confirmationMessage; //chrome 설정
  localStorage.removeItem('accessToken');
}
window.addEventListener('beforeunload', handleBeforeUnload);

root.render(

  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
