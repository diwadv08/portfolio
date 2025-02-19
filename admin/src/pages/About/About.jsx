import React from 'react'
import {Container} from "react-bootstrap";
import { useState,useEffect } from 'react';
import url from '../../url/nodeFile';
import {Link, Links, redirect, useNavigate} from "react-router-dom";
import { nav_links } from '../../common/mylinks';
function About() {
    let[aboutData,setaboutData]=useState();
    // border Radius
    useEffect(()=>{
      fetch(`${url}/about`)
      .then((data)=>(data.json()))
      .then((datas)=>{
        setaboutData(datas)
      })  
      
    },[])
    let num=1;

  

  return (
    <Container className='my-5'>
       <div className="row">
      
        <div className="col-12">
            <div className="table-responsive">
                <table className='table text-dark table-bordered'>
                   <thead className='bg-dark'>
                       <tr>
                            <th>S.No</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Description</th>
                            <th>Action</th>
                       </tr>
                   </thead>
                        {(aboutData)?aboutData.map((e,i)=>{
                            return (
                            <tbody  key={i}>
                                <tr>
                                    <td>{num++}</td>
                                    <td>
                                      <center>
                                        <img src={e.image} height={"60px"} alt="" />
                                      </center>
                                    </td>
                                    <td>{e.name}</td>
                                    <td>{e.title}</td>
                                    <td>{e.mobile}</td>
                                    <td>{e.email}</td>
                                    <td>{e.description}</td>
                                    <td>
                                        <center>
                                        <Link to={nav_links[0].edit+"/"+e._id}><i className='fa fa-edit text-success me-2'></i></Link>
                                        </center>
                                    </td>
                                </tr>
                            </tbody>
                            )
                        }):''}

                </table>

            </div>
        </div>
       </div>
    </Container>
  )
}

export default About
