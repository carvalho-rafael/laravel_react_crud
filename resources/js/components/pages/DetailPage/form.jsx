import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from '../../services/api';

import MyEditor from '../../utils/wysiwyg';
import ReactHtmlParser from 'react-html-parser'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import "./style.css";

const Form = props => {
  const [product, setProduct] = useState(props.product?.product);
  const [categories, setCategories] = useState([])
  const [imgUpload, setImgUpload] = useState([])
  const [formData, setFormData] = useState(new FormData())
  const [images, setImages] = useState([props.product?.images])
  const [description, setDescription] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, reset, errors } = useForm();

  useEffect(() => {
    api.get('categories').then(response => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    setDescription(null)
    setProduct(props.product?.product)
    setImages(props.product?.images)

    if (props.sent) {
      setImgUpload([])
    }
  }, [props.product]);

  useEffect(() => {
    if (props.reset)
      reset()
  }, [props.reset]);

  useEffect(() => {
    setIsLoading(false)
  }, [props.isLoading]);

  useEffect(() => {
    if (props.sent)
      setImgUpload([])
  }, [props.sent]);

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

  const deleteImgFromArray = (image, array) => {
    const copy = [...array]
    const index = copy.indexOf(image)
    if (index !== -1) {
      copy.splice(index, 1)
      return copy
    }
    return -1
  }

  const deleteImgUpload = (image) => {
    const imgArray = deleteImgFromArray(image, imgUpload)

    if (imgArray !== -1) {
      setImgUpload(imgArray)
    }
  }

  const deleteImage = (image) => {
    setIsLoading(true)

    api.delete('images/' + image.id).then(response => {
      if (response.data.message === 'ok') {
        setIsLoading(false)
        const imgArray = deleteImgFromArray(image, images)

        if (imgArray !== -1)
          setImages(imgArray)
      }
    });
  };

  const onSubmit = data => {
    setIsLoading(true)
    console.log(isLoading)
    Object.entries(data).forEach(([key, value]) => {
      if (key == "active") {
        value = value == true ? 1 : 0
      }
      formData.append(key, value)
    })

    for (let i = 0; i < imgUpload.length; i++) {
      formData.append('image[]', imgUpload[i])
    }

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
          <div className="col-md-8 form-panel">
            <div className="image-container form-field-item">
              <div className="img-input-container">
                <label className="img-input-label" htmlFor="img-input">ADD  IMAGE</label>
                <input id="img-input" type="file" name="image[]" multiple onChange={handleChange} />
              </div>
              {imgUpload?.map((image, key) => (
                <div key={key}>
                  <div className="image-item">
                    <button type="button" onClick={() => deleteImgUpload(image)}><span>x</span></button>
                    <img id={"imgUpload" + (key)} className="image image-upload" alt={image} />
                  </div>
                </div>
              ))}
            </div>
            <div className="image-container form-field-item">
              {images?.map((image, key) => (
                <div key={key}>
                  <div className="image-item">
                    <button type="button" onClick={() => deleteImage(image)}><span>x</span></button>
                    <img className="image" src={'storage/images/' + image?.path} alt={image?.path} />
                  </div>
                </div>
              ))}
            </div>
            <div className="form-field-item">
              <label htmlFor="name">Name</label>
              <input name="name" placeholder="name" ref={register} />
            </div>
            <div className="form-field-item">
              <label htmlFor="resume">Resume</label>
              <textarea rows="3" name="resume" ref={register}>
              </textarea>
            </div>
            <div className="form-field-item">
              <label htmlFor="description">Description</label>

              <MyEditor description={description} reference={register} />
            </div>
            <div>
              {ReactHtmlParser(description)}
            </div>
          </div>

          <div className="col-md-4 form-panel">
            <div className="form-field-item">
              <label htmlFor="ref">Reference</label> <br/>
              <input name="ref" placeholder="ref" ref={register} />
            </div>        
            <div className="form-field-item">
              <label htmlFor="quantity">Quantity</label> <br/>
              <input name="quantity" placeholder="000" ref={register} />
            </div>

            <div className="form-field-item">
              <label htmlFor="price">Price</label> <br/>
              <input name="price" placeholder="price" ref={register} />
            </div>
            <label className="control-label form-field-item">Categories<br />
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
            <div className="form-field-item">
              <label htmlFor="active">Active</label>
              <input type="checkbox" id="active" name="active" ref={register} />
            </div>
            <button className="btn btn-primary" type="submit" disabled={isLoading}>{props.buttonLabel}</button>
            <div className={`position-absolute d-inline`} ><Loader
              type="Puff"
              visible={isLoading}
              color="#00BFFF"
              height={30}
              width={30}
            /></div>
          </div>
        </div>

      </form>
    </div >
  );
}

export default Form;