import React from 'react'
import { useState } from 'react';
import { Container} from 'react-bootstrap';
import file_upload from "../assets/images/file-upload.png";
import url from '../url/nodeFile';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function AddProjects() {

  const catgories=['Live Projects','Local Projects','React Project'];

  let nav=useNavigate();
  let defaultData={
    category:catgories[0],
    url:'',
    image:'',
  }
  const [data,setData]=useState(defaultData)

  const [image,setImage]=useState(false)
  const changeBox=(e)=>{    
    setData((prev)=>(
        {...prev,[e.target.name]:e.target.value}
    ))
  }
  const SubmitFun=async(e)=>{
    e.preventDefault();
    const form = new FormData();

    form.append('category',data.category);
    form.append('url',data.url);
    form.append('image',image);    
    const response = await axios.post(url+'/project_add', form, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    });
    nav('/')
  }

  const changeImage=(e)=>{
    setImage(e.target.files[0])
  }

    
  return (
        <Container className='w-75 my-4' style={{height:"450px"}}>
            <div className='row bg-dark p-5 text-light' style={{borderRadius:"30px",boxShadow:"0px 0px 30px grey"}}>
                <div className="col-12 mb-2">
                    <h4>Add Projects</h4>
                </div>
                <form onSubmit={SubmitFun}>
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="">URL</label>
                                    <input type="text" className='form-control' name='url' value={data.url} onChange={changeBox} placeholder='Enter url'/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="">Category</label>
                                    <select name="category" id="" className='form-select' onChange={changeBox}>
                                        {catgories.map((e)=>{
                                            if(e===data.category){
                                                return (
                                                    <option value={e} defaultValue={true}>{e}</option>
                                                )
                                            }
                                            else{
                                                return (
                                                    <option value={e}>{e}</option>
                                                )
                                            }
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 text-lg-start">
                            <label htmlFor="image-upload">
                                <img src={image?URL.createObjectURL(image):file_upload} style={{width:'100%',background:'white',height:'220px'}} alt="" />
                            </label>
                            <input type="file" onChange={changeImage}  className='form-control' accept="image/*" id='image-upload' name='image' hidden/>
                        </div>
                        
                        <div className="col-12 mt-5 mb-0">
                            <input type="submit" className='btn btn-success form-control'/>
                        </div>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default AddProjects