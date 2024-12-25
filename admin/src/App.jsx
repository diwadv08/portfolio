import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import AddSkills from './pages/AddSkills'
import AddAbout from './pages/AddAbout'
import AddEducation from './pages/AddEducation'
import AddExperience from './pages/AddExperience'
import AddProjects from './pages/AddProjects'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Login/>}/>
        <Route path={'/add_skills'} element={<AddSkills/>}/>
        <Route path={'/add_about'} element={<AddAbout/>}/>
        <Route path={'/add_education'} element={<AddEducation/>}/>
        <Route path={'/add_experience'} element={<AddExperience/>}/>
        <Route path={'/add_projects'} element={<AddProjects/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
