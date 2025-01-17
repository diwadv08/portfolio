import React, { useEffect, useState } from 'react'
import {Container} from 'react-bootstrap';
import 'swiper/css';
import {motion} from "framer-motion";
import { zoomIn } from '../animation/variant';

//backend url
import url from '../url/nodeFile';
import myLinks from '../common/links';
function Projects() {
  //result from api
  let[projectData,setProjectData]=useState();
  // border Radius
  useEffect(()=>{
    fetch(`${url}/project`)
    .then((data)=>(data.json()))
    .then((datas)=>{
      setProjectData(datas)
    })  
    console.log(url+"/project");
    
  },[])
  

  const def_img={
    width:'100%',
    borderRadius:'10px',
    boxShadow:'0px 0px 5px black'
  }


  return (
    <Container fluid id={myLinks[2].toLowerCase()}>
    <div className="row section-padding">
      <div className="row">
        <div className="col-12">
          <h1><span>Projects</span></h1>
        </div>
      </div>
      <div className="row m-auto p-0 m-0">
        {projectData ? projectData.map((e,index)=>{
          let catg=e.category?e.category.split(','):'';
          
          return (
            <motion.div 
            initial="hidden"// Starting state: hidden and slightly below
            variants={zoomIn(1)} // Final state: fully visible and in place
            whileInView={"show"}
            viewport={{amount:0.3,once:true}} className="col-lg-6 myBoxxes12 my-1">
                <div className="row px-1 py-3">
                  <div className="col-12">
                  <a href={e.url} target='_blank'>
                    <img src={url+'/images/'+e.image} style={def_img}/>
                  </a>
                  </div>
                  <div className="pt-3">
                    <div className="mydiv">
                      {catg.length>0?catg.map((e)=>{
                        return (
                          <a  target='_blank' className='url1 text-center mt-0 px-2 py-1 me-2'>{e}</a>
                        )
                      }):''}
                    </div>
                  </div>
                  <div className='text-end mt-3 mt-md-0'>
                  <a href={e.url} target='_blank' className='url text-center text-silver mt-0 px-lg-3 px-3 py-1'>Visit Site</a>
                  </div>
              </div>
            </motion.div>
          )
        }).reverse():''}
    </div>
    </div>

   </Container>
  )
}

export default Projects
