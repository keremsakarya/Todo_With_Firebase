import { Toaster } from "react-hot-toast"
import Register from "./pages/Register"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import "./index.css"
import Login from "./pages/Login"
import Modal from "./components/Modal"
import { useSelector } from "react-redux"
import Settings from "./pages/Settings"
function App() {

  const { open, data } = useSelector((state) => state.modal)

  return (
    <>
      <Toaster position="top-right" />
      {open && <Modal data={data} name={open} />}
      <div className="max-w-2xl mx-auto grid gap-y-4 py-4 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </>
  )
}

export default App
