import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import myLinks from '../common/links';
import { useState,useEffect } from 'react';
import url from '../url/nodeFile';
import { flip } from '../animation/variant';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
function Education() {
  
  let[educationData,setEducationData]=useState();
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    fetch(`${url}/education`)
    .then((data)=>(data.json()))
    .then((datas)=>{
      setEducationData(datas)
      setLoading(false)
    })  
  },[])
  
  
  return (
    <Container fluid id={myLinks[4].toLowerCase()}>
       <div className="container">
        <div className='row section-padding'>
          <div className="col-12">
              <h1><span>Education</span></h1>
          </div>
          <motion.div initial="hidden"// Starting state: hidden and slightly below
            variants={flip(1)} // Final state: fully visible and in place
            whileInView={"show"}
            viewport={{once:true,amount:0.3}} className="row px-md-0 mx-md-0 mx-1">
              {loading && (
                <div className="col-lg-6 mx-auto my-2">
                  <Skeleton height={100} borderRadius={10} count={2} className="mb-3" />
                </div>
              )}
              {!loading && educationData?educationData.map((e,index)=>{
                return (
                  <div className="col-lg-6 col-md-6" key={index}>
                    <div className="row p-3 education">
                      <div className="col-md-12 mt-md-0 p-3" style={{background:'var(--bs-black2)',boxShadow:'0px 0px 1px silver'}}>
                        <h2 className='mb-1 mb-md-0'><span className='marks d-block py-2'>{e.mark}</span><span className='text-success grades'>{e.grade}</span> </h2>
                        <h6>{e.college} on <span className='text-success'>{e.year}</span></h6>
                      </div>
                    </div>
                    
                    
                  </div>
                )
              }).reverse():''}
          </motion.div>
       </div>
       </div>
    </Container>
  )
}

export default Education
