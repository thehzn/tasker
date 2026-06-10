

import {  Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Register from "./pages/Register"
import Login from "./pages/Login"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Tasks from './pages/Tasks';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';

function App() {


  return (
    <>
    <Header/>
  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>}/>
   <Route path="/login" element={<Login/>} />
   <Route path='/tasks' element={<Tasks/>}/>
   <Route path='/addtask' element={<AddTask/>}/>
   <Route path='/edittask/:id' element={<EditTask/>}/>
      </Routes>
     <Footer/>   
    </>
  )
}

export default App
