import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import url from '../../url/nodeFile';
import { nav_links } from '../../common/mylinks';
import { cloud_url } from '../../url/cloudUrl';

function EditSkill() {
    let { id: _id } = useParams();
    let nav = useNavigate();

    const options = ['Beginner', 'Intermediate', 'Expert'];
    const [subBtn,seytSubBtn]=useState('Update Skill');
    let defaultData = {
        language: '',
        image: '',
        description: '',
        color: '',
        level: '',
    };

    const [data, setData] = useState(defaultData);
    const [image, setImage] = useState(null);
    
    useEffect(() => {
        axios.get(`${url}/skills/${_id}`)
            .then((response) => {
                if (response.data) {
                    setData({
                        language: response.data.language || '',
                        image: response.data.image || '',
                        description: response.data.description || '',
                        color: response.data.color || '',
                        level: response.data.level || '',
                        _id: response.data._id || '',
                    });
                }
            })
            .catch((error) => console.error('Error fetching skill data:', error));
    }, [_id]);

    const changeBox = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const changeImage = (e) => {
        setImage(e.target.files[0]);
    };
    
    const SubmitFun = async (e) => {
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
        form.append('language', data.language);
        form.append('description', data.description);
        form.append('color', data.color);
        form.append('level', data.level);
        form.append('id', data._id);
        
        await axios.post(`${url}/skills_edit`, form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        nav(nav_links[2].url);
    };

    return (
        <Container className='w-75 my-4' style={{ height: "450px" }}>
            <div className="col-12 text-end my-3">
                <a href={nav_links[2].url} className='btn btn-dark'>
                    <i className='fa fa-plus'></i> View All {nav_links[2].name}
                </a>
            </div>
            <div className='row bg-dark p-5 text-light' style={{ borderRadius: "30px", boxShadow: "0px 0px 30px grey" }}>
                <div className="col-12 mb-2">
                    <h4>Edit Skill</h4>
                </div>

                <form onSubmit={SubmitFun}>
                    <div className="row">
                        <input type="hidden" name="_id" value={data._id} onChange={changeBox} />

                        <div className="col-md-4 my-2">
                            <label className='mb-2'>Language</label>
                            <label htmlFor="" className='mb-2'>Language</label>
                            <input type="text" className='form-control' placeholder='Enter Language' name='language' value={data.language}  onChange={changeBox} />
                        </div>

                        <div className="col-md-4 my-2">
                            <label className='mb-2'>Level</label>
                            <select onChange={changeBox} name="level" className='form-select' value={data.level}>
                                {options.map((level, index) => (
                                    <option value={level} key={index}>{level}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4 my-2">
                            <label className='mb-2'>Select Color</label>
                            <input type="color" className='form-control p-0' name='color' value={data.color}
                                style={{ height: '38px', border: 'none' }} onChange={changeBox} />
                        </div>

                        <div className="col-md-12 my-2">
                            <label className='mb-2'>Description</label>
                            <textarea name="description" onChange={changeBox} rows={4} className='form-control'
                                placeholder='Enter Description' value={data.description}></textarea>
                        </div>

                        <div className="col-lg-12 text-center">
                            <label htmlFor="image-upload">
                                <img src={image ? URL.createObjectURL(image) : data.image}
                                    style={{ width: '100%', background: 'white', height: '290px' }} alt="Preview" />
                            </label>
                            <input type="file" onChange={changeImage} className='form-control' accept="image/*"
                                id='image-upload' name='image' hidden />
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
    );
}

export default EditSkill;
