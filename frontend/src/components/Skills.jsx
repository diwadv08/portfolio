import React, { useEffect, useState } from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import {  Pagination, Scrollbar, A11y ,Autoplay,EffectFade} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
//backend url
import url from '../url/nodeFile';
import myLinks from '../common/links';
function Skills() {
  //result from api
  let[skill_Data,setSkillData]=useState();
  // border Radius
  let myCircle='15px';
  // Letter limits
  let letterLimits=290;
  useEffect(()=>{
    fetch(`${url}/skills`)
    .then((data)=>(data.json()))
    .then((datas)=>{
      setSkillData(datas)
    })  
  },[])

  
  
  return (
    <Container fluid id={myLinks[1].toLowerCase()}>
    <div className="row section-padding">
      <h1>My <span>Skills</span></h1>
      
        {skill_Data && skill_Data.map((e,index)=>{
          return (
            <div className="col-lg-4 col-md-6 myBoxxes" key={index}>
              <div className="card">
                <div className="row p-3">
                  <div className="col-md-4 col-6">
                    <img src={url+'/images/'+e.image} style={{height:'40px'}}/>
                  </div>
                  <div className="col-md-8 col-6 text-end mt-2">
                    <span className='badge' style={{background:'black',color:'#e3e3e3',padding:'5px 25px',borderRadius:'30px',fontWeight:'600',textTransform:'uppercase'}}>{e.level}</span>
                  </div>
                  <div className="col-12 mt-3">
                    <p style={{height:'160px',overflow:'auto',fontSize:'14px'}} className='text-secondary'>{(e.description.length>letterLimits)?e.description.substr(0,letterLimits)+'....':e.description}</p>
                  </div>
                  <div className="col-12">
                    <h6 className='py-2 pt-1 text-center' style={{background:e.color,color:'white',fontWeight:700}}>{e.language.toUpperCase()}</h6>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
    </div>
   </Container>
  )
}

export default Skills
