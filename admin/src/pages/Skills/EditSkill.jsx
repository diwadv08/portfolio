import React from 'react'
import { useState,useEffect } from 'react';
import { Container} from 'react-bootstrap';
import file_upload from "../../assets/images/slider.jpg";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import url from '../../url/nodeFile';
import { nav_links } from '../../common/mylinks';
function EditSkill() {
  let _id=useParams();
   _id=_id.id;

  let nav=useNavigate();
  const options=['Beginner','Intermediate','Expert'];
  const languages=['HTML','CSS','Bootstrap','Javascript','JQuery','PHP','MySql','React JS','Node JS','Express JS','Mongo DB','Next JS'];
  let defaultData={
    language:'HTML',
    image:'',
    description:'',
    color:'#ff007d',
    level:'Beginner',
  }
  

  const [data,setData]=useState(defaultData)

  const [image,setImage]=useState(false)
  const changeBox=(e)=>{    
    setData((prev)=>(
        {...prev,[e.target.name]:e.target.value}
    ))
    
  }

  useEffect(()=>{
    fetch(`${url}/skills/${_id}`)
    .then((data)=>(data.json()))
    .then((datas)=>{
        setData(datas)
    })  
  },[])

  
  const SubmitFun=async(e)=>{
    e.preventDefault();
    const form = new FormData();
    

    form.append('category',data.category);
    form.append('language',data.language);
    form.append('description',data.description);
    form.append('url',data.url);
    form.append('color',data.color);
    form.append('level',data.level);
    form.append('image',image);    
    form.append('id',data._id);    
    await axios.post(url+'/skills_edit', form, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    });
    nav(nav_links[2].url)
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
                    <h4>Edit skillss</h4>
                </div>
                
                <form onSubmit={SubmitFun}>
                    <div className="row">
                    <input type="text" name="_id" id=""  value={data._id} className='form-control' hidden onChange={changeBox} />

                    <div className="col-md-4 my-2">
                                    <label htmlFor="" className='mb-2'>Language</label>
                                    <select onChange={changeBox} name="language"  className='form-select'  id="">
                                        {languages.map((e,index)=>{
                                            if(e===data.language){
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
                                    <textarea name="description" onChange={changeBox}  rows={4} className='form-control' id="" placeholder='Enter Description' defaultValue={data.description}></textarea>
                                </div>

                     
                        <div className="col-lg-12 text-center">
                            <label htmlFor="image-upload">
                                
                                <img src={image?URL.createObjectURL(image):(url+'/images/'+data.image)} style={{width:'100%',background:'white',height:'290px'}} alt="" />
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

export default EditSkill