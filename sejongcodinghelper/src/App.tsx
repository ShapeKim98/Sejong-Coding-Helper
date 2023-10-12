import React, { useEffect } from 'react';
import GlobalStyle from './style/globalStyle';
import Home from './pages/Home'
import logo from './logo.svg';
import './App.css';
import Spacer from './components/Spacer';
import HStack from './components/HStack';
import VStack from './components/VStack';

function App() {
  return (
    <div style={{width: '100%', height: '100vh', position: 'relative', background: 'linear-gradient(0deg, white 0%, white 100%), linear-gradient(270deg, rgba(195, 0, 47, 0.05) 0%, rgba(195, 0, 47, 0) 100%)'}}>
      <GlobalStyle />
        <Home />
    </div>
  );
}

export default App;
