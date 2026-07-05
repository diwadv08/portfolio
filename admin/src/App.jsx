import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import AddSkills from './pages/Skills/AddSkills'
import EditAbout from './pages/About/EditAbout'

import AddExperience from './pages/Experience/AddExperience'
import AddProjects from './pages/Project/AddProjects'
import ViewProject from './pages/Project/ViewProject'
import Header from './components/Header'
import { nav_links } from './common/mylinks'
import "./main.css"
import EditProject from './pages/Project/EditProject'
import Skill from './pages/Skills/Skills'
import EditSkill from './pages/Skills/EditSkill'
import EditEducation from './pages/Education/EditEducation'
import Education from './pages/Education/Education'
import AddEducation from './pages/Education/AddEducation'
import Experience from './pages/Experience/Experience'
import EditExperience from './pages/Experience/EditExperience'
import About from './pages/About/About'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Header/>
          <br/>
          <Routes>
            <Route path={'/'} element={<Login/>}/>

            <Route path={nav_links[0].url} element={<ProtectedRoute><About/></ProtectedRoute>}/>
            <Route path={nav_links[0].edit+"/:id"} element={<ProtectedRoute><EditAbout/></ProtectedRoute>}/>

            <Route path={nav_links[1].add} element={<ProtectedRoute><AddProjects/></ProtectedRoute>}/>
            <Route path={nav_links[1].url} element={<ProtectedRoute><ViewProject/></ProtectedRoute>}/>
            <Route path={nav_links[1].edit+"/:id"} element={<ProtectedRoute><EditProject/></ProtectedRoute>}/>

            <Route path={nav_links[2].add} element={<ProtectedRoute><AddSkills/></ProtectedRoute>}/>
            <Route path={nav_links[2].url} element={<ProtectedRoute><Skill/></ProtectedRoute>}/>
            <Route path={nav_links[2].edit+"/:id"} element={<ProtectedRoute><EditSkill/></ProtectedRoute>}/>

            <Route path={nav_links[3].add} element={<ProtectedRoute><AddEducation/></ProtectedRoute>}/>
            <Route path={nav_links[3].edit+"/:id"} element={<ProtectedRoute><EditEducation/></ProtectedRoute>}/>
            <Route path={nav_links[3].url} element={<ProtectedRoute><Education/></ProtectedRoute>}/>

            <Route path={nav_links[4].url} element={<ProtectedRoute><Experience/></ProtectedRoute>}/>
            <Route path={nav_links[4].add} element={<ProtectedRoute><AddExperience/></ProtectedRoute>}/>
            <Route path={nav_links[4].edit+"/:id"} element={<ProtectedRoute><EditExperience/></ProtectedRoute>}/>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
