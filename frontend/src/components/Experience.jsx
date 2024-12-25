import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import myLinks from '../common/links';
import { useState,useEffect } from 'react';
import url from '../url/nodeFile';
function Experience() {
  
  let[experienceData,setexperienceData]=useState();
  useEffect(()=>{
    fetch(`${url}/experience`)
    .then((data)=>(data.json()))
    .then((datas)=>{
      setexperienceData(datas)
    })  
  },[])
  
  
  return (
    <Container fluid id={myLinks[3].toLowerCase()}>
       <div className='row section-padding'>
              <div className="row">
                <div className="col-12">
                  <h1>My <span>Experience</span></h1>
              </div>
              </div>
              
              <div className="row text-center mx-md-0 mx-2">
              {experienceData?experienceData.map((e,index)=>{
                return (
                    <div className="col-lg-6 col-md-6 ps-md-5 ps-0" key={index}>
                    <div className="row p-1">
                      <div className="col-md-12 mt-md-0 d-flex flex-column experience p-5" style={{gap:'15px'}}>
                        <h5 className='mb-md-0 grade'>{e.company_name}</h5>
                        <h2 className='role mb-md-0 text-success'>{e.role}</h2>
                        <h6 className='year'>{e.from}-{e.to}</h6>
                        <button className='myBtn btn text-dark px-3 py-1 bg-success'>{e.experience} years</button>
                      </div>
                    </div>
                    {(index===0)?'':<div className="d-md-none">
                      <hr />
                    </div>}
                    
                    </div>
                )
              }).reverse():''}
              </div>
       </div>
    </Container>
  )
}

export default Experience
