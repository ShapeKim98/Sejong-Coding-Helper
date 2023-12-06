import React, { ReactElement, useEffect, useRef, useState } from 'react';
import GlobalStyle from './style/globalStyle';
import Home from './pages/Home'
import ProblemResult from './pages/ProblemResult'
import HeaderBar from './pages/Header'
import './App.css';
import Roadmap from './pages/Roadmap';
import RoadmapDetail from './pages/RoadmapDetail';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshTokenToCookie, onSilentRefresh } from './api/Auth/Auth';
import { isEmpty } from 'lodash';
import User from './models/User';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import MyPage from './pages/MyPage';
import ProblemRecommend from './pages/ProblemRecomnend';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: {user: User}) => state.user);

  useEffect(() => {
    onSilentRefresh(dispatch);
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          return caches.delete(key);
        }),
      );
    });
  }, []);

  const refreshToken = getRefreshTokenToCookie();
  if (isEmpty(user.bojHandle) && !isEmpty(refreshToken)) {
    return <></>;
  }
  
  return (
    <div style={{width: '100%', 
                height: '100%'}}>
      <GlobalStyle />
      <BrowserRouter>
        {!isEmpty(refreshToken) && <HeaderBar />}
        <Routes>
            <Route element={<PrivateRoute userAuthentication={false} />}>
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<PrivateRoute userAuthentication={true} />}>
              <Route path='/home' element={<Home />} />
              <Route path='/problemresult' element={<ProblemResult />} />
              <Route path='/roadmap' element={<Roadmap />} />
              <Route path='/roadmapdetail' element={<RoadmapDetail />} />
              <Route path='/ranking' element={<Ranking />} />
              <Route path='/myPage' element={<MyPage />} />
              <Route path='problemRecommend' element={<ProblemRecommend />} />
              <Route path='*' element={<Navigate to='/home' />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
