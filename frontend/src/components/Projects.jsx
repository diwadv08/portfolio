import React, { useEffect, useState } from 'react'
import {Container,Row,Col,ModalBody,Modal,ModalDialog} from 'react-bootstrap';
import {  Pagination, Scrollbar, A11y ,Autoplay,EffectFade, EffectCoverflow, Virtual} from 'swiper/modules';
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
  


  const [show, setShow] = useState(false);
  const [img,setImg]=useState("");
  const handleClose = (e) =>{
    setShow(false);
  }
  const handleShow = (e) => {
    setShow(true);
    setImg(e.target.src);
    
  }

  const span_model={
    right:"-15px",
    top:"-15px",
    padding:"2px",
    borderRadius:"50px",
    cursor:"pointer"
  }

  const def_img={
    width:'100%',
    borderRadius:'10px',
    boxShadow:'0px 0px 5px black'
  }

  const modal_dialog={
    transform:"scale(2.1)",
    marginTop:"100px"
  }

  return (
    <Container fluid id={myLinks[2].toLowerCase()}>
    <div
    className="row section-padding">
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
      speed={3000}
      direction="horizontal"
      modules={[Pagination, Scrollbar, A11y,Autoplay,EffectCoverflow ]}
      spaceBetween={0}
      effect="coverflow"
      loop={true}  // Infinite loop
      autoplay={{
        delay:500, 
      }}
      grabCursor={true}
      centeredSlides={true}
      coverflowEffect={{
        rotate: -50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
    >
        {projectData ? projectData.map((e,index)=>{
          return (
            <SwiperSlide key={index} className='myBoxxes12' onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}>
              <div className="card">
                <div className="row p-3" >
                  <div className="col-12">
                  <img src={url+'/images/'+e.image} style={def_img} onClick={handleShow}/>
                  </div>
                  <div className="d-flex align-items-center justify-content-between pt-3">
                    <a><i className='text-light'>{e.category}</i></a>
                    <a href={e.url} target='_blank' className='url text-center text-white mt-0 px-3'>Click Here<i className='fa arrow-right text-light'></i></a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        }).reverse():''}
      </Swiper>
    </div>

   
      <Modal show={show} onHide={handleClose} className='p-0 m-0'>
        <Modal.Dialog className='p-0 position-relative' style={modal_dialog}>
            <span className='position-absolute bg-danger pt-0 px-2 text-white' style={span_model} onClick={handleClose} >&times;</span>
            <img className='p-0' src={img} alt=""  style={{width:"100%",border:"none"}}/>
        </Modal.Dialog>
      </Modal>
   </Container>
  )
}

export default Projects
