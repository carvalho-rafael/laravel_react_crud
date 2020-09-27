import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from '../../services/api';
import TinyMce from '../../utils/wysiwyg';

import "./style.css";

function Form(props) {
  const [product, setProduct] = useState(props.product?.product);
  const [categories, setCategories] = useState([])
  const buttonLabel = props.buttonLabel
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    api.get('categories').then(response => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    setProduct(props.product?.product)
  }, [props]);

  useEffect(() => {
    reset({
      name: product?.name,
      ref: product?.ref,
      resume: product?.resume,
      price: product?.price,
      quantity: product?.quantity,
      active: product?.active,
      category_id: product?.category_id,
    });

  }, [product]);

  const onSubmit = data => {
    props?.action?.(data)

    alert(JSON.stringify(data));
  };

  return (
    <div className="App container">
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

            <TinyMce content={product?.description} reference={register} id={product?.id} />
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
            <div className="categories-container">
              {categories?.map((i) => (
                <div key={i.id}>
                  <input
                    id={i.id}
                    type="radio"
                    name="category_id"
                    ref={register}
                    value={i.id}
                    defaultChecked={i.id === product?.category_id} />
                  <label htmlFor={i.id}>{i.name}</label>
                </div>
              ))}
            </div>
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