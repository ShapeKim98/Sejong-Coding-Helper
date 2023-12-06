import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { logoutProc } from './api/Auth/Auth';
import { Provider } from 'react-redux';
import Store from './redux/Store';

// axios설정
// axios.defaults.baseURL = 'https://univps.kr'
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 응답 코드가 403일경우 리프레쉬 토큰 만료: 로그아웃 처리
    if (error.response?.status === 403) {
      logoutProc(null);
    }
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
