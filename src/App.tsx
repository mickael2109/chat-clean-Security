import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminRouter from "./router/AdminRouter"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Login/>}/> 
        <Route path="/register" element={<Register/>}/> 
        <Route 
            path="/admin/*" 
            element={
                <AdminRouter/>
            }
        />  
      </Routes>
    </BrowserRouter>
  )
}

export default App
