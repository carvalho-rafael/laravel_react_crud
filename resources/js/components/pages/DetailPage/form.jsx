import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from '../../services/api';
import MyEditor from '../../utils/wysiwyg';

import "./style.css";

const Form = props => {
  const [product, setProduct] = useState(props.product?.product);
  const [categories, setCategories] = useState([])
  const [images, setImages] = useState([props.product?.images])
  const [description, setDescription] = useState(null)
  const buttonLabel = props.buttonLabel
  const { register, handleSubmit, reset, errors, setValue } = useForm();

  useEffect(() => {
    api.get('categories').then(response => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    register({ name: 'image' })
  }, [register])

  useEffect(() => {
    setProduct(props.product?.product)
    setImages(props.product?.images)
  }, [props]);

  useEffect(() => {
    if (product != undefined) {
      reset(product)
      setDescription(product?.description)
    }
  }, [product]);

  const handleChange = (e) => {
    setValue('image', e.target.files[0]);

  }

  const onSubmit = data => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key == "active") {
        value = value == true ? 1 : 0
      }
      formData.append(key, value)
    })
    /*   for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]); 
    } */
    props.action?.(formData)
  };

  return (
    <div className="App container">

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-8">
            <div className="image-container">
              <div className="add-image image-item">
                <input type="file" name="image" id="image" onChange={handleChange} />
              </div>
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
                    id={i.id}
                    type="radio"
                    name="category_id"
                    ref={register({ required: true })}
                    value={i.id}
                    defaultChecked={i.id === product?.category_id}
                  />
                  <label htmlFor={i.id}>{i.name}</label>
                </div>
              ))}
              {errors.category_id && <div className="form_error">Number of Vehicles is required</div>}
            </label>
            <div>
              <label htmlFor="active">Active</label>
              <input type="checkbox" id="active" name="active" ref={register} />
            </div>
            <input type="submit" value={buttonLabel} />
          </div>
        </div>

      </form>
    </div >
  );
}

export default Form;