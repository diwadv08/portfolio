import React from 'react'
import {Container} from "react-bootstrap";
import { useState,useEffect } from 'react';
import url from '../../url/nodeFile';
import {Link} from "react-router-dom";
import { nav_links } from '../../common/mylinks';
function Education() {
  let[educationData,seteducationData]=useState();
    // border Radius
    useEffect(()=>{
      fetch(`${url}/education`)
      .then((data)=>(data.json()))
      .then((datas)=>{
        seteducationData(datas)
      })  
      console.log(url+"/education");
      
    },[])
    let num=1;

   let deleteFn=async(id)=>{
      let deleteeducation=await fetch(`${url}/education_delete/${id}`,{
        method:'DELETE'
      })
      const res=await deleteeducation.json();
      if(res){
        window.location.reload();
      }
   }

  return (
    <Container className='my-5'>
       <div className="row">
        <div className="col-12 text-end my-3">
          <a href={nav_links[3].add} className='btn btn-dark'>
            <i className='fa fa-plus'></i> Add {nav_links[3].name}
          </a>
        </div>
        <div className="col-12">
            <div className="table-responsive">
                <table className='table text-dark table-bordered'>
                   <thead className='bg-dark text-light'>
                       <tr>
                            <th>S.No</th>
                            <th>Grade</th>
                            <th>Year</th>
                            <th>Mark</th>
                            <th>Institute Name</th>
                            <th>Action</th>
                       </tr>
                   </thead>
                        {(educationData)?educationData.map((e,i)=>{
                            return (
                            <tbody  key={i}>
                                <tr>
                                    <td>{num++}</td>
                                    <td>{e.grade}</td>
                                    <td>{e.year}</td>
                                    <td>{e.mark}</td>
                                    <td>{e.college}</td>
                                    <td>
                                        <Link to={nav_links[3].edit+"/"+e._id}><i className='fa fa-edit text-success me-2'></i></Link>
                                        <i className='fa fa-trash text-danger' onClick={()=>{return deleteFn(e._id)}}></i>
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

export default Education