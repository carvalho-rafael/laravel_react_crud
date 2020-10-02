import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Form from './form';

function Create(props) {

    const createProduct = (data) => {
        api.post('products', data, {
            headers: {
                'Content-Type' : `multipart/form-data; boundary=${data._boundary}`,
            }
        }).then(response => {
            console.log(response)
        })
    }

    return (
        <>
            <header>
                <Link to="/">
                    <FiArrowLeft />
                Products List
            </Link>
            </header>
            <Form buttonLabel={"create"} action={createProduct} />
        </>
    )
}

export default Create;