import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import myLinks from '../common/links'
import { useState,useEffect } from 'react';
import url from '../url/nodeFile';
import { motion } from 'framer-motion';
import { left, zoomIn } from '../animation/variant';
import resume_pdf from "../pdf/resume.pdf"
import Skeleton from 'react-loading-skeleton';
function About() {
  let[about,setAbout]=useState();
  let myRole='Mern Stack Developer';
  const [displayedText, setDisplayedText] = useState('');
  const [loading, setLoading] = useState(true);
  let speed=50;
  useEffect(()=>{
    fetch(`${url}/about`)
    .then((data)=>(data.json()))
    .then((datas)=>{
      setAbout(datas)
      setLoading(false);
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


  let[contact,setContact]=useState();
  let contact_names=['Github','Linked In','Email','Call'];
  let bg=['bg-social','bg-social','bg-social','bg-social','bg-social2'];
  let cols=[6,6,6,6,12]
  let icons=['fa-brands fa-whatsapp','fa-brands fa-github','fa-brands fa-linkedin','fa fa-envelope','fa fa-download'];
  let usernames=['9489460029','diwadv08','dv813','diwadv813','Download Resume'];
  let contact_links=['tel:'+usernames[0],'https://github.com/diwadv08','https://www.linkedin.com/in/dv813','mailto:'+usernames[3]+'@gmail.com',resume_pdf];

  return (
    <Container fluid id={myLinks[0].toLowerCase()}  className='home-section-padding bg-dark'>
          
            {loading
            ?  
            Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} />)
            :about ? about.map((e)=>
              (<div className="row d-md-flex flex-md-row flex-row-reverse flex-column" key={e}>
                 <motion.div initial="hidden"// Starting state: hidden and slightly below
                             variants={zoomIn(1)} // Final state: fully visible and in place
                             whileInView={"show"}
                             viewport={{once:false,amount:0.3}} className="col-md-5 text-md-center text-center align-self-center" >
                  <div className="myimage mt-md-3">
                      <img src={e.image} className='text-end' alt=""  />
                  </div>
                </motion.div>
                <div className="col-md-7 pt-3 px-4 px-md-0 align-self-center myAbout text-md-start text-center position-relative">
                              
                            <h4 className='name mt-4 mt-lg-0 text-center pe-lg-5'>{e.name?e.name.toUpperCase():''}</h4>
                            <p className='text-secondary text-center pe-lg-5'>{e.description?e.description:''}</p>
                            <h1 className='role text-center pe-lg-5'>MERN<span className='ps-3'>Stack Developer</span></h1>
                            <div className="row me-lg-5 mt-4">
                              {usernames.map((e,index)=>{
                                return (
                                    <div className={"col-lg-"+cols[index]+" mb-3 col-12"} title={'Click Here'} key={index}>
                                      <div className={"card "+bg[index]+" py-md-2 py-1"}>
                                        <a href={contact_links[index]} target='_blank'>
                                          <div className="d-flex justify-content-center align-items-center">
                                            <h1 style={{fontSize:'27px'}}><i className={icons[index]+' me-2'}></i></h1>
                                            <h6 className='mt-1'>{usernames[index]}</h6>
                                          </div>
                                        </a>
                                      </div>
                                  </div>
                                )
                              })}
                            </div>
                </div>
               
              </div>)
            ):''}

            
    </Container>
  )
}

export default About
