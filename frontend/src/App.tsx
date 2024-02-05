import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

import { useUserContext } from "./context/Authcontext"

import { Routes, Route, Navigate } from "react-router-dom"

function App() {
  const { value } = useUserContext();
  return (
    <>
      <Routes>
        <Route path="/" element={value?._id ? <Navigate to={"/home"} /> : <Login />} />
        <Route path="/signup" element={value?._id ? <Navigate to={"/home"} /> : <Signup />} />
        <Route path="/home" element={value?._id ? <Home /> : <Navigate to={"/"} />} />
      </Routes>
    </>
  )
}

export default App
