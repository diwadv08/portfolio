import React from 'react'
import { useState,useEffect } from 'react';
import { Container} from 'react-bootstrap';
import file_upload from "../../assets/images/slider.jpg";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import url from '../../url/nodeFile';
import { nav_links } from '../../common/mylinks';
import { cloud_url } from '../../url/cloudUrl';
function EditProject() {
  let _id=useParams();
   _id=_id.id;

  let nav=useNavigate();
  let defaultData={
    category:'',
    url:'',
    image:'',
    _id:'',
  }

  const [data,setData]=useState(defaultData)

  const [image,setImage]=useState(false);
  const [subBtn,seytSubBtn]=useState('Update Project');
  const changeBox=(e)=>{    
    setData((prev)=>(
        {...prev,[e.target.name]:e.target.value}
    ))
    
  }

  useEffect(()=>{
    fetch(`${url}/project/${_id}`)
    .then((data)=>(data.json()))
    .then((datas)=>{
        setData(datas)
    })  
  },[])

  console.log(data._id);
  
  const SubmitFun=async(e)=>{
    e.preventDefault();
    seytSubBtn('Updating...')
    const form = new FormData();
    if(image){
        const cloud_upload = new FormData();
        cloud_upload.append('file', image);
        cloud_upload.append('upload_preset','portfolio' );
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
    }
    form.append('category',data.category);
    form.append('url',data.url);
    form.append('id',data._id);    
    const response = await axios.post(url+'/project_edit', form, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    });
    nav(nav_links[1].url)
  }

  const changeImage=(e)=>{
    setImage(e.target.files[0])
  }

    
  return (
        <Container className='w-75 my-4' style={{height:"450px"}}>
            <div className="col-12 text-end my-3">
                <a href={nav_links[1].url} className='btn btn-dark'>
                    <i className='fa fa-plus'></i> View All {nav_links[1].name}
                </a>
            </div>
            <div className='row bg-dark p-5 text-light' style={{borderRadius:"30px",boxShadow:"0px 0px 30px grey"}}>
                <div className="col-12 mb-2">
                    <h4>Edit Projects</h4>
                </div>
                
                <form onSubmit={SubmitFun}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <input type="text" name="_id" id=""  value={data._id} className='form-control' hidden onChange={changeBox} />
                                    <label htmlFor="">URL</label>
                                    <input type="text" className='form-control' name='url' value={data.url} onChange={changeBox} placeholder='Enter url'/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="">Tools used</label>
                                    <input type="text" name='category' value={data.category}  onChange={changeBox} placeholder='Ex:- HTML,CSS,Bootstrap'  className='form-control'/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 text-center">
                            <label htmlFor="image-upload">
                                
                                <img src={image?URL.createObjectURL(image):(data.image)} style={{width:'100%',background:'white',height:'290px'}} alt="" />
                            </label>
                            <input type="file" onChange={changeImage}  className='form-control' accept="image/*" id='image-upload' name='image' hidden/>
                        </div>
                        
                        <div className="col-12 mt-5 mb-0">
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

export default EditProject