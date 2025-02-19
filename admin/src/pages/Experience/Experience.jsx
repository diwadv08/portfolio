import React from 'react'
import { Container} from 'react-bootstrap';
import url from '../../url/nodeFile';
import {Link, useNavigate} from "react-router-dom";
import { useState,useEffect } from 'react';
import { nav_links } from '../../common/mylinks';

function Experience() {
    let[experienceData,setexperienceData]=useState();
    // border Radius
    useEffect(()=>{
      fetch(`${url}/experience`)
      .then((data)=>(data.json()))
      .then((datas)=>{
        setexperienceData(datas)
      })  
      console.log(url+"/experience");
      
    },[])
    let num=1;

   let deleteFn=async(id)=>{
    let con=confirm('Are You sure want to delete this')
      if(con){
        let deleteexperience=await fetch(`${url}/experience_delete/${id}`,{
          method:'DELETE'
        })
        const res=await deleteexperience.json();
        if(res){
          window.location.reload();
        }
      }
   }

  return (
    <Container className='my-5'>
       <div className="row">
        <div className="col-12 text-end my-3">
          <a href={nav_links[4].add} className='btn btn-dark'>
            <i className='fa fa-plus'></i> Add {nav_links[4].name}
          </a>
        </div>
        <div className="col-12">
            <div className="table-responsive">
                <table className='table text-dark table-bordered'>
                   <thead className='bg-dark text-light'>
                       <tr>
                            <th>S.No</th>
                            <th>Company Name</th>
                            <th>Role</th>
                            <th>Period</th>
                            <th>Experience</th>
                            <th>Place</th>
                            <th>Action</th>
                       </tr>
                   </thead>
                        {(experienceData)?experienceData.map((e,i)=>{
                            return (
                            <tbody  key={i}>
                                <tr>
                                    <td>{num++}</td>
                                    <td>{e.company_name}</td>
                                    <td>{e.role}</td>
                                    <td>{e.from}-{e.to}</td>
                                    <td>{e.experience}</td>
                                    <td>{e.place}</td>
                                    <td>
                                        <Link to={nav_links[4].edit+"/"+e._id}><i className='fa fa-edit text-success me-2'></i></Link>
                                        <i className='fa fa-trash text-danger' onClick={()=>{deleteFn(e._id)}}></i>
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

export default Experience
