import React from 'react'
import { useState,useEffect } from 'react';
import { Container} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import file_upload from "../../assets/images/file-upload.png";
import url from '../../url/nodeFile';
import axios from "axios";
import { nav_links } from '../../common/mylinks';
function AddAbout() {
  let _id=useParams();
  _id=_id.id;
  let defaultData={
    _id:'',
    name:'',
    description:'',
    title:'',
    mobile:'',
    email:'',
  }


  const [data,setData]=useState(defaultData)
  let navto=useNavigate();
  const [image,setImage]=useState(false)
  console.log(`${url}/about_add/${_id}`);
  
  useEffect(()=>{
    fetch(`${url}/about/${_id}`)
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
    form.append('name',data.name);
    form.append('description',data.description);
    form.append('title',data.title);
    form.append('mobile',data.mobile);
    form.append('email',data.email);
    form.append('image',image);
    const response = await axios.post(url+'/about_add', form, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    
    });
    navto(nav_links[0].url);
    
  }

  const changeImage=(e)=>{
    setImage(e.target.files[0])
  }

    
  return (
        <Container className='w-75 my-4' style={{height:"450px"}}>
            <div className='row bg-dark p-5 text-light' style={{borderRadius:"30px",boxShadow:"0px 0px 30px grey"}}>
                <div className="col-12 mb-2">
                    <h4>Update Info</h4>
                </div>
                <form onSubmit={SubmitFun}>
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="row">
                                <input type="text" name='_id' value={data._id} onChange={changeBox} />
                                <div className="col-lg-4 mb-3">
                                    <label htmlFor="">Name</label>
                                    <input type="text" className='form-control' name='name' value={data.name} onChange={changeBox} placeholder='Enter Name'/>
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label htmlFor="">Mobile Number</label>
                                    <input type="text" className='form-control' name='mobile' value={data.mobile} onChange={changeBox} placeholder='Enter Mobile'/>
                                </div>
                                <div className="col-lg-5 mb-3">
                                    <label htmlFor="">Email Id</label>
                                    <input type="email" className='form-control' name='email' value={data.email} onChange={changeBox} placeholder='Enter Email Id'/>
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <label htmlFor="">Title</label>
                                    <input type="text" className='form-control' name='title' value={data.title} onChange={changeBox} placeholder='Enter Title'/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3  text-lg-end">
                            <label htmlFor="image-upload">
                                <img src={image?URL.createObjectURL(image):url+"/images/"+data.image} style={{width:'100%',background:'white',height:'200px'}} alt="" />
                            </label>
                            <input type="file" onChange={changeImage}  className='form-control' accept="image/*" id='image-upload' name='image' hidden/>
                        </div>
                        <div className="col-12 mt-1">
                            <label htmlFor="">Enter Description</label>
                            <textarea name="description" id="" value={data.description} placeholder='Enter Description Or Home Slogan' rows={4} onChange={changeBox} className='form-control'></textarea>
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

export default AddAbout