import {BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { ThemeProvider } from "./context/ThemeContext"
function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
