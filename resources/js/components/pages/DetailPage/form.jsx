import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from '../../services/api';
import MyEditor from '../../utils/wysiwyg';

import "./style.css";
const areEqual = (prevProps, nextProps) => true;

const Form = props => {
  const [product, setProduct] = useState(props.product?.product);
  const [categories, setCategories] = useState([])
  const [description, setDescription] = useState(null)
  const buttonLabel = props.buttonLabel
  const { register, handleSubmit, reset, errors } = useForm({
    defaultValues: {
      description: 'Type something...',
      category_id: 3
    }
  });

  useEffect(() => {
    api.get('categories').then(response => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    if(product == undefined)
      setProduct(props.product?.product)
    console.log(product)
  }, [props]);

  useEffect(() => {
    if(product != undefined){
      reset(product)
      setDescription(product?.description)
    }
    console.log(product)
  }, [product]);

  const onSubmit = data => {
    props.action?.(data)

    alert(JSON.stringify(data));
  };

  return (
    <div className="App container">
          {console.log(description)}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-8">
            <div>
              <label htmlFor="name">Name</label>
              <input name="name" placeholder="name" ref={register} />
            </div>
            <div>
              <label htmlFor="resume">Resume</label>
              <textarea rows="8" name="resume" ref={register}>
              </textarea>
            </div>

            <MyEditor description={description} reference={register} />
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