import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from '../../services/api'

import "./style.css";

function Form(props) {
  const [product, setProduct] = useState(props.product?.product);
  const [formType, setFormType] = useState(props.type)
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    setProduct(props.product?.product)
  }, [props]);

  useEffect(() => {
    reset({
      ref: product?.ref,
      resume: product?.resume,
      description: product?.description,
      price: product?.price,
      quantity: product?.quantity,
      active: product?.active,
      categoryId: product?.category_id,
    });

  }, [product]);

  const onSubmit = data => {
    api.put('products/77', data).then(response => {
      console.log(response)
  });
    alert(JSON.stringify(data));
  };

  return (
    <div className="App container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-8">
            <div>
              <label htmlFor="resume">Resume</label>
              <textarea name="resume" placeholder="000" width="100%" ref={register}></textarea>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea name="description" placeholder="000" ref={register}></textarea>
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
            <div>
              <label htmlFor="active">Active</label>
              <input type="checkbox" name="active" ref={register} />
            </div>
            <input type="submit" value={formType}/>
          </div>
        </div>

      </form>
    </div >
  );
}

export default Form;