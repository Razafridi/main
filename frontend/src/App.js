import React from 'react'
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import ChatScreen from './Screens/ChatScreen'
import HomeScreen from './Screens/HomeScreen'
import RegisterScreen from './Screens/RegisterScreen'
import UserScreen from './Screens/UserScreen'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/users' element={<UserScreen />} />
        <Route path='/chat/:id' element={<ChatScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App