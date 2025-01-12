import React from 'react'
import {Container} from "react-bootstrap";
import { useState,useEffect } from 'react';
import url from '../../url/nodeFile';
import {Link, Links, redirect, useNavigate} from "react-router-dom";
import { nav_links } from '../../common/mylinks';
function Skill() {
    let[skillsData,setskillsData]=useState();
    // border Radius
    useEffect(()=>{
      fetch(`${url}/skills`)
      .then((data)=>(data.json()))
      .then((datas)=>{
        setskillsData(datas)
      })  
      console.log(url+"/skills");
      
    },[])
    let num=1;

   let deleteFn=async(id)=>{
      let deleteskills=await fetch(`${url}/skills_delete/${id}`,{
        method:'DELETE'
      })
      const res=await deleteskills.json();
      if(res){
        window.location.reload();
      }
   }

  return (
    <Container className='my-5'>
       <div className="row">
        <div className="col-12 text-end my-3">
          <a href={nav_links[2].add} className='btn btn-dark'>
            <i className='fa fa-plus'></i> Add {nav_links[2].name}
          </a>
        </div>
        <div className="col-12">
            <div className="table-responsive">
                <table className='table text-dark table-bordered'>
                   <thead className='bg-dark text-light'>
                       <tr>
                            <th>S.No</th>
                            <th>Language</th>
                            <th>Level</th>
                            <th>Color</th>
                            <th>Action</th>
                       </tr>
                   </thead>
                        {(skillsData)?skillsData.map((e,i)=>{
                            return (
                            <tbody  key={i}>
                                <tr>
                                    <td>{num++}</td>
                                    <td>{e.language}</td>
                                    <td>{e.level}</td>
                                    <td>
                                        <p style={{height:'40px',width:'130px',background:e.color}}></p>
                                    </td>
                                    <td>
                                        <Link to={nav_links[2].edit+"/"+e._id}><i className='fa fa-edit text-success me-2'></i></Link>
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

export default Skill
