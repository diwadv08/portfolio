import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import myLinks from '../common/links'
import { useState,useEffect } from 'react';
import url from '../url/nodeFile';
import { motion } from 'framer-motion';
import { left, zoomIn } from '../animation/variant';
function About() {
  let[about,setAbout]=useState();
  let myRole='Mern Stack Developer';
  const [displayedText, setDisplayedText] = useState('');
  let speed=50;
  useEffect(()=>{
    fetch(`${url}/about`)
    .then((data)=>(data.json()))
    .then((datas)=>{
      setAbout(datas)
    })  
  },[])


  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText((prevText) => prevText + myRole[index]);
      index++;

      if (index === myRole.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [myRole, speed]);


  

  return (
    <Container fluid id={myLinks[0].toLowerCase()}  className='home-section-padding'>
          
            {about ? about.map((e)=>
              (<div className="row d-md-flex flex-md-row flex-row-reverse flex-column" key={e}>
                 <motion.div initial="hidden"// Starting state: hidden and slightly below
                             variants={zoomIn(1)} // Final state: fully visible and in place
                             whileInView={"show"}
                             viewport={{once:false,amount:0.3}} className="col-md-6 h-100 text-md-center text-center align-self-center" >
                  <div className="myimage">
                      <img src={url+'/images/'+e.image} className='text-end' alt="" width={'75%'} />
                  </div>
                </motion.div>
                <motion.div initial="hidden"// Starting state: hidden and slightly below
                             variants={left(1)} // Final state: fully visible and in place
                             whileInView={"show"}
                             viewport={{once:false,amount:0.3}} className="col-md-6 pt-3 ps-4 px-md-0 align-self-center myAbout text-md-start text-center">
                  <h4 className='name'><span className='ps-1'>Diwakar M</span></h4>
                  <h1 className='role'>MERN <span>Stack Developer</span></h1>
                  <p className='ps-1'>Developing the impossible</p>
                  <div className='socialmedia-linkss mt-4'>
                    <i className='fa fa-database icon1 me-2'></i>
                    <i className='fa-brands fa-node-js icon2 me-2'></i>
                    <i className='fa-brands fa-react icon3 me-2'></i>
                    <i className='fa-brands fa-node icon4 me-2'></i>
                  </div>
                </motion.div>
               
              </div>)
            ):''}
    </Container>
  )
}

export default About
