import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import myLinks from '../common/links';
import { useState,useEffect } from 'react';
import url from '../url/nodeFile';
function Education() {
  
  let[educationData,setEducationData]=useState();
  useEffect(()=>{
    fetch(`${url}/education`)
    .then((data)=>(data.json()))
    .then((datas)=>{
      setEducationData(datas)
    })  
  },[])
  
  
  return (
    <Container fluid id={myLinks[4].toLowerCase()}>
       <div className='row section-padding'>
          <div className="col-12">
              <h1>Education</h1>
          </div>
          <div className="row px-md-0 mx-md-0 mx-1">
              {educationData?educationData.map((e,index)=>{
                return (
                  <div className="col-lg-6 col-md-6" key={index}>
                    <div className="row p-3 education">
                      <div className="col-md-12 mt-md-0 p-3" style={{boxShadow:'0px 0px 1px silver'}}>
                        <h2 style={{fontWeight:'200'}} className='mb-4 mb-md-0'>{e.grade} <span className='text-success d-md-block d-inline py-md-2'>{e.mark}</span></h2>
                        <h6>{e.college} on <span className='text-success'>{e.year}</span></h6>
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

export default Education