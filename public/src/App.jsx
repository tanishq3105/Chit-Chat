
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Chat } from './components/Chat';
import { SetAvatar } from './components/SetAvatar';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/set-avatar' element={<SetAvatar/>}/>
        <Route path='/' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
