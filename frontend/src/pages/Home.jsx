import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import About from '../components/About'
import Education from '../components/Education'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Footer from '../components/Footer'
import SitePreloader from '../components/SitePreloader'
import ScrollProgressBar from '../components/ScrollProgressBar'
import CursorGlow from '../components/CursorGlow'
import url from '../url/nodeFile'

function Home() {
  // Gates the first paint of real content behind a short branded preloader
  // until the initial "About" data has actually arrived from the DB
  // (or a minimum time has passed, so the loader never feels like a flicker).
  const [dataReady, setDataReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 700);

    fetch(`${url}/about`)
      .then((res) => res.json())
      .catch(() => null)
      .finally(() => setDataReady(true));

    return () => clearTimeout(timer);
  }, []);

  const showApp = dataReady && minTimeElapsed;

  return (
    <div>
      <SitePreloader visible={!showApp} />
      <ScrollProgressBar />
      <CursorGlow />
      <div style={{ visibility: showApp ? 'visible' : 'hidden' }}>
        <Header/>
          <About/>
          <Skills/>
          <Projects/>
          <Experience/>
          <Education/>
          <Footer/>
      </div>
    </div>
  )
}

export default Home
