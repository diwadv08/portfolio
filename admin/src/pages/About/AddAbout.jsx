import React from 'react'
import { useState } from 'react';
import { Container} from 'react-bootstrap';
import file_upload from "../../assets/images/file-upload.png";
import url from '../../url/nodeFile';
import axios from "axios";
function AddAbout() {
  let defaultData={
    name:'',
    description:'',
    title:'',
    mobile:'',
    email:'',
    image:'',
    insta_url:'',
    linkedin_url:'',
    github_url:'',
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

    form.append('name',data.name);
    form.append('description',data.description);
    form.append('title',data.title);
    form.append('mobile',data.mobile);
    form.append('email',data.email);
    form.append('image',image);
    form.append('insta_url',data.insta_url);
    form.append('linkedin_url',data.linkedin_url);
    form.append('github_url',data.github_url);
    const response = await axios.post(url+'/about_add', form, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    });
    console.log('Image and data uploaded:', response.data);
  }

  const changeImage=(e)=>{
    setImage(e.target.files[0])
  }

    
  return (
        <Container className='w-75 my-4' style={{height:"450px"}}>
            <div className='row bg-dark p-5 text-light' style={{borderRadius:"30px",boxShadow:"0px 0px 30px grey"}}>
                <div className="col-12 mb-2">
                    <h4>Add About</h4>
                </div>
                <form onSubmit={SubmitFun}>
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="">Name</label>
                                    <input type="text" className='form-control' name='name' value={data.name} onChange={changeBox} placeholder='Enter Name'/>
                                </div>
                                <div className="col-3 mb-3">
                                    <label htmlFor="">Mobile Number</label>
                                    <input type="text" className='form-control' name='mobile' value={data.mobile} onChange={changeBox} placeholder='Enter Mobile'/>
                                </div>
                                <div className="col-5 mb-3">
                                    <label htmlFor="">Email Id</label>
                                    <input type="email" className='form-control' name='email' value={data.email} onChange={changeBox} placeholder='Enter Email Id'/>
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="">Title</label>
                                    <input type="text" className='form-control' name='title' value={data.title} onChange={changeBox} placeholder='Enter Title'/>
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="">Github URL</label>
                                    <input type="text" className='form-control' name='github_url' value={data.github_url} onChange={changeBox} placeholder='Ex: https://github'/>
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="">LinkedIn URL</label>
                                    <input type="text" className='form-control' name='linkedin_url' value={data.linkedin_url} onChange={changeBox} placeholder='Ex: https://Linkedin'/>
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="">Insatgram URL</label>
                                    <input type="text" className='form-control' name='insta_url' value={data.insta_url} onChange={changeBox} placeholder='Ex: https://Imstagram'/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6  text-lg-end">
                            <label htmlFor="image-upload">
                                <img src={image?URL.createObjectURL(image):file_upload} style={{width:'100%',background:'white',height:'200px'}} alt="" />
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