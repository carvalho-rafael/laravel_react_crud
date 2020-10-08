import React, { useEffect, useState } from "react";
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import api from '../../services/api';
import MyEditor from '../../utils/wysiwyg';
import ReactHtmlParser from 'react-html-parser'

import "./style.css";

const Form = props => {
  const [product, setProduct] = useState(props.product?.product);
  const [categories, setCategories] = useState([])
  const [imgUpload, setImgUpload] = useState([])
  const [formData, setFormData] = useState(new FormData())
  const [images, setImages] = useState([props.product?.images])
  const [description, setDescription] = useState(null)

  const { register, handleSubmit, reset, errors } = useForm();

  useEffect(() => {
    api.get('categories').then(response => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    setProduct(props.product?.product)
    setImages(props.product?.images)

    if (props.reset)
      reset()
  }, [props]);

  useEffect(() => {
    if (product != undefined) {
      reset(product)
      setDescription(product?.description)
    }
  }, [product]);

  useEffect(() => {
    for (let i = 0; i < imgUpload.length; i++) {
      const reader = new FileReader();
      reader.onloadend = e =>
        document.getElementById("imgUpload" + (i)).src = e.target.result

      reader.readAsDataURL(imgUpload[i])
    }

  }, [imgUpload]);


  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];

      setImgUpload(img => [...img, file])

    }
  }

  const deleteImgUpload = (image) => {
    const copy = [...imgUpload]
    const index = copy.indexOf(image)
    if (index !== -1) {
      copy.splice(index, 1)
      setImgUpload(copy)

    }
  }

  const onSubmit = data => {
    Object.entries(data).forEach(([key, value]) => {
      if (key == "active") {
        value = value == true ? 1 : 0
      }
      formData.append(key, value)
    })

    for (let i = 0; i < imgUpload.length; i++) {
      formData.append('image[]', imgUpload[i])
    }

    /*   for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]); 
    } */
    props.action?.(formData)
    setFormData(new FormData)
  };

  return (
    <div className="App container">
      <button className="back-button">
        <Link className="link" to="/">
          <span><FiArrowLeft /></span>
          Products List
        </Link>
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-8">
            <div className="image-container">
              <div className="img-input-container">
                <label className="img-input-label" htmlFor="img-input">ADD  IMAGE</label>
                <input id="img-input" type="file" name="image[]" multiple onChange={handleChange} />
              </div>
              {imgUpload?.map((image, key) => (
                <div key={key}>
                  <div className="image-item">
                    <button type="button" onClick={() => deleteImgUpload(image)}><span>x</span></button>
                    <img id={"imgUpload" + (key)} className="image" alt={image} />
                  </div>
                </div>
              ))}
            </div>
            <div className="image-container">
              {images?.map((image, key) => (
                <div key={key}>
                  <div className="image-item">
                    <img className="image" src={'storage/images/' + image?.path} alt={image?.path} />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <input name="name" placeholder="name" ref={register} />
            </div>
            <div>
              <label htmlFor="resume">Resume</label>
              <textarea rows="8" name="resume" ref={register}>
              </textarea>
            </div>
            <div>
              <label htmlFor="description">Description</label>

              <MyEditor description={description} reference={register} />
            </div>
            <div>
              {ReactHtmlParser(description)}
            </div>
          </div>

          <div className="col-md-2">
            <div>
              <label htmlFor="ref">Reference</label>
              <input name="ref" placeholder="ref" ref={register} />
            </div>        <div>
              <label htmlFor="name">Quantity</label>
              <input name="quantity" placeholder="000" ref={register} />
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <input name="price" placeholder="price" ref={register} />
            </div>
            <label className="control-label" htmlFor="category_id">Categories<br />
              {categories?.map((i) => (
                <div key={i.id}>
                  <input
                    id={"category" + i.id}
                    type="radio"
                    name="category_id"
                    defaultChecked={i.id === product?.category}
                    value={i.id}
                    ref={register}
                  />
                  <label htmlFor={"category" + i.id}>{i.name}</label>
                </div>
              ))}
              {errors.category_id && <div className="form_error">Category is required</div>}
            </label>
            <div>
              <label htmlFor="active">Active</label>
              <input type="checkbox" id="active" name="active" ref={register} />
            </div>
            <input type="submit" value={props.buttonLabel} />
          </div>
        </div>

      </form>
    </div >
  );
}

export default Form;