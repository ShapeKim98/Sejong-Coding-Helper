import React, { ReactElement, useEffect } from 'react';
import GlobalStyle from './style/globalStyle';
import Home from './pages/Home'
import ProblemResult from './pages/ProblemResult'
import logo from './logo.svg';
import './App.css';
import Spacer from './components/Spacer';
import HStack from './components/HStack';
import VStack from './components/VStack';
import Header from './components/Header'

function HeaderButton({title}: {title: string}): React.ReactElement {
  return (
    <p style={{marginRight: '40px'}}>{title}</p>
  );
}

function HeaderBar() {
  return (
    <Header>
      <HStack>
        <HeaderButton title={'문제 추천'} />
        <HeaderButton title={'시험 연습'} />
        <HeaderButton title={'랭킹'} />
        <HeaderButton title={'검색하기'} />
      </HStack>
    </Header>
  );
}

function App() {
  return (
    <div style={{width: '100%', height: '100vh', background: 'linear-gradient(0deg, white 0%, white 100%), linear-gradient(270deg, rgba(195, 0, 47, 0.05) 0%, rgba(195, 0, 47, 0) 100%)'}}>
      <GlobalStyle />
      <VStack>
        <HeaderBar />
        {/* <Home /> */}
        <ProblemResult />
      </VStack>
        
    </div>
  );
}

export default App;
