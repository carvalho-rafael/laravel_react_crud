import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Form from './form';

function Edit(props) {

    const [product, setProduct] = useState([])
    const id = props.location.state.id;

    const updateProduct = (data) => {
        api.put('products/' + id, data).then(response => {
            console.log(response)
        })
    }

    useEffect(() => {
        api.get('products/' + id).then(response => {
            setProduct(response.data);
        });
    }, []);

    return (
        <>
            <header>
                <Link to="/">
                    <FiArrowLeft />
            Products List
        </Link>
            </header>
            <Form product={product} buttonLabel={"update"} action={updateProduct} />
        </>
    )
}

export default Edit;