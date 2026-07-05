import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import url from '../../url/nodeFile';
import axios from "axios";
import { nav_links } from '../../common/mylinks';
import { cloud_url, cloud_pdf_url } from '../../url/cloudUrl';

function AddAbout() {
  let { id } = useParams();

  const defaultData = {
    _id: '',
    name: '',
    description: '',
    title: '',
    mobile: '',
    email: '',
  };

  const [subBtn, setSubBtn] = useState('Update About');
  const [data, setData] = useState(defaultData);
  const [image, setImage] = useState(false);
  const [resume, setResume] = useState(false);

  const navto = useNavigate();

  // FETCH DATA
  useEffect(() => {
    fetch(`${url}/about/${id}`)
      .then(res => res.json())
      .then(datas => setData(datas));
  }, [id]);

  // INPUT CHANGE
  const changeBox = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // IMAGE CHANGE
  const changeImage = (e) => {
    setImage(e.target.files[0]);
  };

  // RESUME CHANGE
  const changeResume = (e) => {
    setResume(e.target.files[0]);
  };

  // SUBMIT
  const SubmitFun = async (e) => {
    e.preventDefault();

    const form = new FormData();
    setSubBtn('Updating...');

    try {
      // ✅ IMAGE UPLOAD (correct endpoint)
      if (image) {
        const imgData = new FormData();
        imgData.append('file', image);
        imgData.append('upload_preset', 'portfolio');

        const res = await axios.post(cloud_url, imgData);

        form.append('image', res.data.secure_url);
      }

      // ✅ RESUME UPLOAD (correct endpoint)
      if (resume) {
        const pdfData = new FormData();
        pdfData.append('file', resume);
        pdfData.append('upload_preset', 'portfolio');

        const res = await axios.post(cloud_pdf_url, pdfData);

        form.append('resume', res.data.secure_url);
      }

      // TEXT DATA
      form.append('id', data._id);
      form.append('name', data.name);
      form.append('description', data.description);
      form.append('title', data.title);
      form.append('mobile', data.mobile);
      form.append('email', data.email);

      // API CALL
      await axios.post(url + '/about_add', form, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSubBtn('Updated ✔');
      navto(nav_links[0].url);

    } catch (err) {
      console.error(err);
      setSubBtn('Update Failed');
    }
  };

  return (
    <Container className='w-75 my-4'>

      <div className='row bg-dark p-5 text-light'
        style={{ borderRadius: "30px", boxShadow: "0px 0px 30px grey" }}>

        <div className="col-12 mb-3">
          <h4>Update About Info</h4>
        </div>

        <form onSubmit={SubmitFun} className="row">

          {/* LEFT INPUTS */}
          <div className="col-lg-9">
            <div className="row">

              <input type="hidden" name="_id" value={data._id} />

              <div className="col-lg-6 mb-3">
                <label>Name</label>
                <input name="name" value={data.name}
                  onChange={changeBox} className="form-control" />
              </div>

              <div className="col-lg-6 mb-3">
                <label>Mobile</label>
                <input name="mobile" value={data.mobile}
                  onChange={changeBox} className="form-control" />
              </div>

              <div className="col-lg-6 mb-3">
                <label>Email</label>
                <input name="email" value={data.email}
                  onChange={changeBox} className="form-control" />
              </div>

              <div className="col-lg-6 mb-3">
                <label>Title</label>
                <input name="title" value={data.title}
                  onChange={changeBox} className="form-control" />
              </div>

            </div>
          </div>

          {/* IMAGE */}
          <div className="col-lg-3 text-end">
            <label htmlFor="image-upload">
              <img
                src={image ? URL.createObjectURL(image) : data.image}
                style={{ width: "100%", height: "200px", background: "white" }}
                alt=""
              />
            </label>
            <input
              type="file"
              id="image-upload"
              hidden
              accept="image/*"
              onChange={changeImage}
            />
          </div>

          {/* RESUME */}
          <div className="col-12 mt-3">
            <label>Upload Resume (PDF)</label>
            <input
              type="file"
              className="form-control"
              accept="application/pdf"
              onChange={changeResume}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="col-12 mt-3">
            <label>Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={changeBox}
              rows={4}
              className="form-control"
            />
          </div>

          {/* SUBMIT */}
          <div className="col-12 mt-4">
            <button className="btn btn-success w-100">
              {subBtn}
            </button>
          </div>

        </form>
      </div>
    </Container>
  );
}

export default AddAbout;