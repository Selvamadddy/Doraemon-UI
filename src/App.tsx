import './App.css'
import { Provider } from 'react-redux'
import { store } from './ReduxManager/Store.tsx'
import "./Utils/ResponsiveUtility/Responsive.css"

import { Routes, Route, Navigate } from "react-router-dom"
import { Suspense, lazy } from "react"

import ToastProvider from "./Components/Common/ErrorToast/ToastContext.tsx"
import AuthenticateRoue from './Components/Common/AuthValidation/AuthenticateRoue.tsx'

// Lazy loaded pages
const Login = lazy(() => import('./Components/LoginPage/Login.tsx'))
const Register = lazy(() => import('./Components/LoginPage/Register.tsx'))
const ResetPassword = lazy(() => import('./Components/LoginPage/ResetPassword.tsx'))
const MainBody = lazy(() => import('./Components/MainBody.tsx'))

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>

        <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>

          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/dashboard" element={<AuthenticateRoue><MainBody screen='Dashboard' /></AuthenticateRoue>} />
            <Route path="/chatbot" element={<AuthenticateRoue><MainBody screen='Chat with me' /></AuthenticateRoue>} />
            <Route path="/doTo" element={<AuthenticateRoue><MainBody screen='To do Task' /></AuthenticateRoue>} />
            <Route path="/gym" element={<AuthenticateRoue><MainBody screen='Gym' /></AuthenticateRoue>} />
            <Route path="/expensetracker" element={<AuthenticateRoue><MainBody screen='Expense tracker' /></AuthenticateRoue>} />
            <Route path="/fishmonitor" element={<AuthenticateRoue><MainBody screen='Fish monitor' /></AuthenticateRoue>} />
            <Route path="/setting" element={<AuthenticateRoue><MainBody screen='Setting' /></AuthenticateRoue>} />

            <Route path="*" element={<AuthenticateRoue><Navigate to="/dashboard" replace /></AuthenticateRoue>} />

          </Routes>

        </Suspense>

      </ToastProvider>
    </Provider>
  )
}

export default App