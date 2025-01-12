import React from 'react'
import { useState,useEffect } from 'react';
import { Container} from 'react-bootstrap';
import url from '../../url/nodeFile';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { nav_links } from '../../common/mylinks';

function EditEducation() {
    let _id=useParams();
    _id=_id.id;
      let defaultData={
        _id:'',
        grade:'',
        year:'',
        mark:'',
        college:''
      }
      let nav=useNavigate();

   

      
    
      const [data,setData]=useState(defaultData)
      useEffect(()=>{
        fetch(`${url}/education/${_id}`)
        .then((data)=>(data.json()))
        .then((datas)=>{
            setData(datas)
        })  
      },[])
      const changeBox=(e)=>{    
        setData((prev)=>(
            {...prev,[e.target.name]:e.target.value}
        ))
        
      }
     
      
      const SubmitFun=async(e)=>{
        e.preventDefault();
        const form = new FormData();
    
        form.append('id',data._id);
        form.append('grade',data.grade);
        form.append('year',data.year);
        form.append('mark',data.mark);
        form.append('college',data.college);
        await axios.post(url+'/education_edit', form, {
        headers: {
           'Content-Type': 'application/json'
        },
        });
        nav(nav_links[3].url)
      }
    
        return (
            <Container className='w-75 my-4' style={{height:"450px"}}>
                <div className='row bg-dark p-5 text-light' style={{borderRadius:"30px",boxShadow:"0px 0px 30px grey"}}>
                    <div className="col-12 mb-2">
                        <h4>Edit Education Details</h4>
                    </div>
                    <form onSubmit={SubmitFun}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label htmlFor="">Course Name</label>
                                        <input type="text" className='form-control' name='_id' value={data._id} onChange={changeBox} placeholder='Enter Course Name'hidden />
                                        <input type="text" className='form-control' name='grade' value={data.grade} onChange={changeBox} placeholder='Enter Course Name'/>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label htmlFor="">Institute Name</label>
                                        <input type="text" className='form-control' name='college' value={data.college} onChange={changeBox} placeholder='Enter Institute Name'/>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label htmlFor="">Mark / CGPA</label>
                                        <input type="text" className='form-control' name='mark' value={data.mark} onChange={changeBox} placeholder='Ex:8.05 Or 88% '/>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label htmlFor="">Passed Out Year</label>
                                        <input type="text" name='year' onChange={changeBox} className='form-control' value={data.year} placeholder='Passed Out Year'/>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12 mt-4 mb-0">
                                <input type="submit" className='btn btn-success form-control'/>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        )
}

export default EditEducation
