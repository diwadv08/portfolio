import React from 'react'
import { useState,useEffect } from 'react';
import { Container} from 'react-bootstrap';
import url from '../../url/nodeFile';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { nav_links } from '../../common/mylinks';

function EditExperience() {
    let _id=useParams();
    _id=_id.id;
      let defaultData={
        _id:'',
        company_name:'',
        from:'',
        to:'',
        experience:'',
        place:'',
        role:'',
      }
      let nav=useNavigate();

   

      
      const [subBtn,seytSubBtn]=useState('Edit Experience');
    
      const [data,setData]=useState(defaultData)
      useEffect(()=>{
        fetch(`${url}/experience/${_id}`)
        .then((data)=>(data.json()))
        .then((datas)=>{
            setData(datas)
        })  
      },[])
      console.log(`${url}/experience/${_id}`);
      const changeBox=(e)=>{    
        setData((prev)=>(
            {...prev,[e.target.name]:e.target.value}
        ))
        
      }
     
      
      const SubmitFun=async(e)=>{
        e.preventDefault();
        const form = new FormData();
        seytSubBtn('Uploading...')
        form.append('id',data._id);
        form.append('company_name',data.company_name);
        form.append('from',data.from);
        form.append('to',data.to);
        form.append('experience',data.experience);
        form.append('place',data.place);
        form.append('role',data.role);
        await axios.post(url+'/experience_edit', form, {
        headers: {
           'Content-Type': 'application/json'
        },
        });
        nav(nav_links[4].url)
      }
    
        return (
            <Container className='w-75 my-4' style={{height:"450px"}}>
                <div className='row bg-dark p-5 text-light' style={{borderRadius:"30px",boxShadow:"0px 0px 30px grey"}}>
                    <div className="col-12 mb-2">
                        <h4>Edit experience Details</h4>
                    </div>
                    <form onSubmit={SubmitFun}>
                    <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <input type="text" name="_id" id=""  value={data._id} className='form-control' hidden onChange={changeBox} />
                                        <label htmlFor="">Company Name</label>
                                        <input type="text" className='form-control' name='company_name' value={data.company_name} onChange={changeBox} placeholder='Enter Company Name'/>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                      <label htmlFor="">Place</label>
                                      <input type="text" name='place' onChange={changeBox} className='form-control' value={data.place} placeholder='Enter Work Place'/>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                      <label htmlFor="">Role</label>
                                      <input type="text" name='role' onChange={changeBox} className='form-control' value={data.role} placeholder='Enter Role'/>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="">From</label>
                                        <input type="text" name='from' onChange={changeBox} className='form-control' value={data.from} placeholder='From'/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="">To</label>
                                        <input type="text" className='form-control' name='to' value={data.to} onChange={changeBox} placeholder='To'/>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="">Total Experience</label>
                                        <input type="text" className='form-control' name='experience' value={data.experience} onChange={changeBox} placeholder='Enter Total Experience'/>
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

export default EditExperience
