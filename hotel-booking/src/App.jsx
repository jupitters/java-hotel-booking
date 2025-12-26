import React from "react"
import AddRoom from './components/room/AddRoom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ExistingRooms from "./components/room/ExistingRooms.jsx";
import Home from "./components/home/Home.jsx";
import EditRoom from "./components/room/EditRoom.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";

function App() {
  return (
    <>
    <main>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:roomId/view" element={<EditRoom />} />
                <Route path="/existing-rooms" element={<ExistingRooms />} />
                <Route path="/add-room" element={<AddRoom />} />
            </Routes>
        </Router>
        <Footer />
    </main>
    </>
  )
} 

export default App
