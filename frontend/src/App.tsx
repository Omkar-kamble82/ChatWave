import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

import { useUserContext } from "./context/Authcontext"

import { Routes, Route, Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode";

type decode = {
  userId: string, 
  iat: number, 
  exp: number
}
function App() {
  const { value } = useUserContext();
  let decode: decode 
  let authencated = false;
  if(value?.token) {
    decode = jwtDecode(value?.token)
    authencated = decode.userId === value._id
    if(!authencated) {
      localStorage.removeItem("user")
    }
  }
  
  return (
    <>
      <Routes>
        <Route path="/" element={authencated ? <Navigate to={"/home"} /> : <Login />} />
        <Route path="/signup" element={authencated ? <Navigate to={"/home"} /> : <Signup />} />
        <Route path="/home" element={authencated ? <Home /> : <Navigate to={"/"} />} />
      </Routes>
    </>
  )
}

export default App
