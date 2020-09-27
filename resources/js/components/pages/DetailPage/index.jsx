import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'
import Edit from './edit';

const DetailPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('products').then(response => {
            setProducts(response.data);
        });
    }, []);

    return (
        <div>
            <header>
                <div className="logo">
                    <h2></h2>
                </div>
                <Link to="/">
                    <FiArrowLeft />
                        Voltar para Home
                    </Link>
            </header>
            <main>
               <Edit></Edit>
            </main>


        </div>
    );
}
export default DetailPage;