import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import AddSkills from './pages/Skills/AddSkills'
import AddAbout from './pages/About/EditAbout'

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
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <br/>
      <Routes>
        <Route path={'/'} element={<Login/>}/>
        <Route path={nav_links[0].url} element={<About/>}/>
        <Route path={nav_links[0].edit+"/:id"} element={<AddAbout/>}/>


        <Route path={nav_links[1].add} element={<AddProjects/>}/>
        <Route path={nav_links[1].url} element={<ViewProject/>}/>
        <Route path={nav_links[1].edit+"/:id"} element={<EditProject/>}/>


        <Route path={nav_links[2].add} element={<AddSkills/>}/>
        <Route path={nav_links[2].url} element={<Skill/>}/>
        <Route path={nav_links[2].edit+"/:id"} element={<EditSkill/>}/>



        <Route path={nav_links[3].add} element={<AddEducation/>}/>
        <Route path={nav_links[3].edit+"/:id"} element={<EditEducation/>}/>
        <Route path={nav_links[3].url} element={<Education/>}/>


        <Route path={nav_links[4].url} element={<Experience/>}/>
        <Route path={nav_links[4].add} element={<AddExperience/>}/>
        <Route path={nav_links[4].edit+"/:id"} element={<EditExperience/>}/>
        

      </Routes>
    </BrowserRouter>
  )
}

export default App
