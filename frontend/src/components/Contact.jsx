import React from 'react';
import {Container} from 'react-bootstrap';
import myLinks from '../common/links';
import { useState,useEffect } from 'react';
import url from '../url/nodeFile';
import { motion } from 'framer-motion';
import { zoomIn } from '../animation/variant';
function Contact() {
  let[contact,setContact]=useState();
  let contact_names=['Github','Linked In','Email','Call'];
  let bg=['bg-social'];
  let icons=['github','linkedin','gmail','whatsapp'];
  let usernames=['diwadv08','dv813','diwadv813','9489460029'];
  let contact_links=['https://github.com/diwadv08','https://www.linkedin.com/in/dv813','mailto:'+usernames[2]+'@gmail.com','tel:'+usernames[3]];

  let links=['']
  useEffect(()=>{
    fetch(`${url}/about`)
    .then((data)=>(data.json()))
    .then((datas)=>{
      setContact(datas)
    })  

  },[])

  console.log(contact);
  


  
  return (
    <Container fluid  className='section-padding'>
       <div className="row">
          <div className="col-12">
            <h1>Contact <span>Me</span></h1>
          </div>
                  {usernames.map((e,index)=>{
                    return (
                        <div className="col-lg-3 my-md-3 my-2 col-md-6 col-12" title={'Click Here'} key={index}>
                          <div className={"card "+bg[0]+" py-md-3 py-0"}>
                            <a href={contact_links[index]} target='_blank'>
                              <div className="d-flex justify-content-center align-items-center">
                                <h1 style={{fontSize:'37px'}}><i className={'fa-brands fa-'+icons[index]+' me-2'}></i></h1>
                                <h6 style={{textTransform:'lowercase'}} className='mt-2'>{usernames[index]}</h6>
                              </div>
                            </a>
                          </div>
                      </div>
                    )
                  })}
       </div>
    </Container>
  )
}

export default Contact
