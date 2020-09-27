import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import api from '../../services/api'
import Form from './form';

import "./style.css";

function Edit(prop) {

    const [product, setProduct] = useState([])
    const id = 77;

    useEffect(() => {
        api.get('products/' + id).then(response => {
            setProduct(response.data);
        });
    }, []);

    return (
        <Form product={product} type={"update"} id={id}/>
    )
}

export default Edit;