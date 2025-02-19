import React from 'react'
import { useState } from 'react';
import { Container} from 'react-bootstrap';
import url from '../../url/nodeFile';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { nav_links } from '../../common/mylinks';
function AddEducation() {
    let defaultData={
        grade:'',
        year:'',
        mark:'',
        college:''
      }
      let navto=useNavigate();
      const [data,setData]=useState(defaultData)
      const changeBox=(e)=>{    
        setData((prev)=>(
            {...prev,[e.target.name]:e.target.value}
        ))
        
      }
      const [subBtn,seytSubBtn]=useState('Add Education');
     
      
      const SubmitFun=async(e)=>{
        e.preventDefault();
        seytSubBtn('Uploading...')
        const form = new FormData();
    
        form.append('grade',data.grade);
        form.append('year',data.year);
        form.append('mark',data.mark);
        form.append('college',data.college);
        const response = await axios.post(url+'/education_add', form, {
        headers: {
           'Content-Type': 'application/json'
        },
        });
        navto(nav_links[3].url)
      }
    
        return (
            <Container className='w-75 my-4' style={{height:"450px"}}>
                <div className='row bg-dark p-5 text-light' style={{borderRadius:"30px",boxShadow:"0px 0px 30px grey"}}>
                    <div className="col-12 mb-2">
                        <h4>Add Education Details</h4>
                    </div>
                    <form onSubmit={SubmitFun}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label htmlFor="">Course Name</label>
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
                                <button type="submit" className='btn btn-success form-control'>
                                {subBtn}
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        )
}

export default AddEducation
