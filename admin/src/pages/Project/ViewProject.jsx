import React from 'react'
import {Container} from "react-bootstrap";
import { useState,useEffect } from 'react';
import url from '../../url/nodeFile';
import {Link, Links, redirect, useNavigate} from "react-router-dom";
import { nav_links } from '../../common/mylinks';
function ViewProject() {
    let[projectData,setProjectData]=useState();
    let navto=useNavigate();
    // border Radius
    useEffect(()=>{
      fetch(`${url}/project`)
      .then((data)=>(data.json()))
      .then((datas)=>{
        setProjectData(datas)
      })  
      console.log(url+"/project");
      
    },[])
    let num=1;

   let deleteFn=async(id)=>{
      let deleteProject=await fetch(`${url}/project_delete/${id}`,{
        method:'DELETE'
      })
      const res=await deleteProject.json();
      if(res){
        window.location.reload();
      }
   }

  return (
    <Container className='my-5'>
       <div className="row">
        <div className="col-12 text-end my-3">
          <a href={nav_links[1].add} className='btn btn-dark'>
            <i className='fa fa-plus'></i> Add {nav_links[1].name}
          </a>
        </div>
        <div className="col-12">
            <div className="table-responsive">
                <table className='table text-dark table-bordered'>
                   <thead className='bg-dark'>
                       <tr>
                            <th>S.No</th>
                            <th>Image</th>
                            <th>Skills</th>
                            <th>Url</th>
                            <th>Action</th>
                       </tr>
                   </thead>
                        {(projectData)?projectData.map((e,i)=>{
                            return (
                            <tbody  key={i}>
                                <tr>
                                    <td>{num++}</td>
                                    <td>
                                      <center>
                                        <img src={url+'/images/'+e.image} height={"60px"} alt="" />
                                      </center>
                                    </td>
                                    <td>{e.category}</td>
                                    <td>{e.url}</td>
                                    <td>
                                        <Link to={nav_links[1].edit+"/"+e._id}><i className='fa fa-edit text-success me-2'></i></Link>
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

export default ViewProject
