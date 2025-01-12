import React, { useEffect, useState } from 'react'
import {Container} from 'react-bootstrap';
import {  Pagination, Scrollbar, A11y ,Autoplay,EffectFade, EffectCoverflow, Virtual} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRef } from 'react';
//backend url
import url from '../url/nodeFile';
import myLinks from '../common/links';
function Skills() {
  //result from api
  let[skill_Data,setSkillData]=useState();
  // border Radius
  let myCircle='15px';
  // Letter limits
  let letterLimits=200;
  useEffect(()=>{
    fetch(`${url}/skills`)
    .then((data)=>(data.json()))
    .then((datas)=>{
      setSkillData(datas)
    })  
  },[])

  const swiperRef = useRef(null); 
  const handleMouseEnter = () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.autoplay.stop(); 
      }
    };
  const handleMouseLeave = () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.autoplay.start(); 
      }
  };
  
  return (
    <Container fluid id={myLinks[1].toLowerCase()}>
    <div className="row section-padding">
      <h1>My <span>Skills</span></h1>
      <Swiper
      breakpoints={{
        320: { slidesPerView: 1 }, // 1 slide on small screens (default)
        540: { slidesPerView: 1 }, // 1 slide on small screens (default)
        640: { slidesPerView: 2 }, // 1 slide on small screens (default)
        768: { slidesPerView: 2 }, // 2 slides on medium screens
        1024: { slidesPerView: 3}, // 3 slides on large screens
      }}
      ref={swiperRef}
      speed={1900}
      direction="horizontal"
      modules={[Pagination, Scrollbar, A11y,Autoplay ]}
      spaceBetween={30}
      loop={true}  // Infinite loop
      autoplay={{
        delay:0, 
      }}
      
    >
      


        {skill_Data && skill_Data.map((e,index)=>{
          return (
            <SwiperSlide key={index}  onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} className='myBoxxes'>
              <div className="card">
                <div className="row p-3 myDivContent">
                  <div className="col-md-4 col-6">
                  </div>
                  <div className="col-md-8 col-6 text-end mt-2">                    
                    <span className='badge level'>{e.level}</span>
                  </div>
                  <div className="col-12 d-flex flex-column align-items-center justify-content-center">
                    <img src={url+'/images/'+e.image} style={{height:'70px'}}/>
                    <span className='mt-3' style={{background:e.color,color:'white',fontWeight:'700',padding:'1px 30px',borderRadius:'30px'}}>{e.language.toUpperCase()}</span>
                  </div>
                  <div className="col-12 mt-5">
                    <p>{(e.description.length>letterLimits)?e.description.substr(0,letterLimits)+'....':e.description}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
    </Swiper>

    </div>
   </Container>
  )
}

export default Skills
