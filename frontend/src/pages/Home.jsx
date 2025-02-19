import React from 'react'
import Header from '../components/Header'
import About from '../components/About'
import Education from '../components/Education'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <Header/>
      <About/>
      <Skills/>
      <Projects/>
      <Experience/>
      <Education/>
      <Footer/>
    </div>
  )
}

export default Home
