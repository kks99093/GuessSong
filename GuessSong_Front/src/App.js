import './App.css';
import React from 'react'
// eslint-disable-next-line
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Main from './pages/main/Main';
import RegSong from './pages/regSong/RegSong';
import CreateRoom from './pages/createRoom/CreateGame';
import GameBoard from './pages/GameBoard';
import GameList from './pages/gameList/GameList';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Main/>}/>
          <Route path="/board/main" exact={true} element={<Main/>}/>
          <Route path="/board/regSong" exact={true} element={<RegSong/>}/>
          <Route path="/board/createGame" exact={true} element={<CreateRoom/>}/>
          <Route path="/board/multiGameBoard" exact={true} element={<GameBoard/>}/>
          <Route path="/board/GameList" exact={true} element={<GameList/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
