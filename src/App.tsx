import './App.css'
import NavComp from './Components/Common/NavComp.tsx'
import MainBody from './Components/MainBody.tsx'
import { Provider } from 'react-redux';
import { store } from './ReduxManager/Store.tsx';
import "./Utils/ResponsiveUtility/Responsive.css"
import Login from './Components/LoginPage/Login.tsx';

import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard.tsx';
import Register from './Components/LoginPage/Register.tsx';
import ResetPassword from './Components/LoginPage/ResetPassword.tsx';

function App() {

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/dashboard" element={<MainBody screen='Dashboard'/>} />
        <Route path="/chatbot" element={<MainBody screen='Chat with me'/>} />
        <Route path="/doTo" element={<MainBody screen='To do List'/>} />
        <Route path="/gym" element={<MainBody screen='Gym'/>} />
        <Route path="/expensetracker" element={<MainBody screen='Expense tracker'/>} />
        <Route path="/fishmonitor" element={<MainBody screen='Fish monitor'/>} />
        <Route path="/setting" element={<MainBody screen='Setting'/>} />
      </Routes>
    </Provider>

  )
}

export default App
