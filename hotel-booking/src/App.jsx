import React from "react"
import AddRoom from './components/room/AddRoom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ExistingRooms from "./components/room/ExistingRooms.jsx";
import Home from "./components/home/Home.jsx";

function App() {
  return (
    <>
    <main>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:roomId/view" element={<ViewRoom />} />
            </Routes>
        </Router>
    </main>
        <AddRoom />
        <ExistingRooms />
    </>
  )
} 

export default App
