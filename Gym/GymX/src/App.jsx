import './App.css'
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Home, ExerciseDetail, Nadvar } from "./components/index";

function App() {
  return (
    <>
      <Box width="400px">
        <Nadvar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/exercise/:id' element={<ExerciseDetail />}/>
        </Routes>
      </Box>
    </>
  )
}

export default App
