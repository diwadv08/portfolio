import React from 'react'
import { useState } from 'react';
import { Container} from 'react-bootstrap';
import file_upload from "../../assets/images/file-upload.png";
import url from '../../url/nodeFile';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { nav_links } from '../../common/mylinks';
import { cloud_url } from '../../url/cloudUrl';
function AddSkills() {
  
  const options=['Beginner','Intermediate','Expert'];
  
  const [subBtn,seytSubBtn]=useState('Add Skill');
  let nav=useNavigate();
  let defaultData={
    language:'',
    image:'',
    description:'',
    color:'#1ea100',
    level:'Beginner',
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
    seytSubBtn('Uploading...')
    const cloud_upload = new FormData();
    const form = new FormData();

    cloud_upload.append('file', image);  // Ensure 'image' field is correctly named
    cloud_upload.append('upload_preset','portfolio' );  // Ensure 'image' field is correctly named
    try {
        const response = await axios.post(cloud_url, cloud_upload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    form.append('image', response.data.url);

    } catch (error) {
        console.error('Error uploading image and data:', error);
    }

    form.append('language', data.language);
    form.append('description', data.description);
    form.append('level', data.level);
    form.append('color', data.color);
    
    try {
        const response = await axios.post(url+'/skills_add', form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        nav(nav_links[2].url)
        console.log('Image and data uploaded:', response.data);
    } catch (error) {
        console.error('Error uploading image and data:', error);
    }        
  }

  const changeImage=(e)=>{
    setImage(e.target.files[0])
  }

    
  return (
        <Container className='w-75 my-4' style={{height:"450px"}}>
            <div className='row bg-dark p-5 text-light' style={{borderRadius:"30px",boxShadow:"0px 0px 30px grey"}}>
                <div className="col-12 mb-2">
                    <h4>Add Skills Form</h4>
                </div>
                <form onSubmit={SubmitFun}>
                    <div className="row">
                        <div className="col-lg-9 col-12">
                            <div className="row">
                                <div className="col-md-4 my-2">
                                    <label htmlFor="" className='mb-2'>Language</label>
                                    <input type="text" className='form-control' placeholder='Enter Language' name='language' value={data.language}  onChange={changeBox} />
                                </div>
                                <div className="col-md-4 my-2">
                                    <label htmlFor="" className='mb-2'>Level</label>
                                        <select onChange={changeBox} name="level"  className='form-select'  id="">
                                            {options.map((e,index)=>{
                                                if(e===data.level){
                                                    return(
                                                        <option value={e} key={index} defaultValue={true}>{e}</option>
                                                    )
                                                }
                                                else{
                                                    return(
                                                        <option value={e} key={index}>{e}</option>
                                                    )
                                                }
                                            })}
                                        </select>
                                </div>
                                <div className="col-md-4 my-2">
                                    <label htmlFor="" className='mb-2'>Select Color</label>
                                    <input type="color" className='form-control  p-0' placeholder='Enter Percentage' name='color' value={data.color} style={{height:'38px',border:'none'}} onChange={changeBox} />
                                </div>
                                <div className="col-md-12 my-2">
                                    <label htmlFor="" className='mb-2'>Description</label>
                                    <textarea name="description" onChange={changeBox}  rows={4} className='form-control' id="" placeholder='Enter Description'></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6  text-lg-end">
                            <label htmlFor="image-upload">
                                <img src={image?URL.createObjectURL(image):file_upload} style={{width:'100%',background:'white',height:'200px',marginTop:'30px'}} alt="" />
                            </label>
                            <input type="file" onChange={changeImage}  className='form-control' accept="image/*" id='image-upload' name='image' hidden/>
                        </div>
                        <div className="col-12 mt-3 mb-0">
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

export default AddSkills