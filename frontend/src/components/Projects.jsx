import React, { useEffect, useState } from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import {  Pagination, Scrollbar, A11y ,Autoplay,EffectFade} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRef } from 'react';
//backend url
import url from '../url/nodeFile';
import myLinks from '../common/links';
function Projects() {
  //result from api
  let[projectData,setProjectData]=useState();
  // border Radius
  let myCircle='15px';
  // Letter limits
  let letterLimits=190;
  let tools;
  useEffect(()=>{
    fetch(`${url}/project`)
    .then((data)=>(data.json()))
    .then((datas)=>{
      setProjectData(datas)
    })  
    console.log(url+"/project");
    
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
    <Container fluid id={myLinks[2].toLowerCase()}>
    <div className="row section-padding">
      <h1>My <span>Projects</span></h1>
     
      <Swiper
      breakpoints={{
        320: { slidesPerView: 1 }, // 1 slide on small screens (default)
        540: { slidesPerView: 1 }, // 1 slide on small screens (default)
        640: { slidesPerView: 2 }, // 1 slide on small screens (default)
        768: { slidesPerView: 2 }, // 2 slides on medium screens
        1024: { slidesPerView: 2 }, // 3 slides on large screens
      }}
      ref={swiperRef}
      speed={2000}
      direction="horizontal"
      modules={[ Pagination, Scrollbar, A11y,Autoplay,EffectFade ]}
      spaceBetween={20}
      loop={true}  // Infinite loop
      autoplay={{
        delay:0, 
      }}
    >
        {projectData ? projectData.map((e,index)=>{
          return (
            <SwiperSlide key={index} className='myBoxxes12' onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}>
              <div className="card">
                <div className="row p-3" >
                  <div className="col-12">
                  <img src={url+'/images/'+e.image} style={{width:'100%',borderRadius:'10px',boxShadow:'0px 0px 5px black'}}/>
                  </div>
                  <a href={e.url} target='_blank' className='url text-center text-white py-1'><i className='fa fa-globe text-light'></i> Visit Url</a>
                  <p className='mt-3 mb-0'>{e.category}</p>
                </div>
              </div>
            </SwiperSlide>
          )
        }).reverse():''}
      </Swiper>
    </div>
   </Container>
  )
}

export default Projects
