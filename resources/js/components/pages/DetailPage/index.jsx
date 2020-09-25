import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

const DetailPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('products').then(response => {
            setProducts(response.data.data);
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
                <ul className="container md-4">
                    {products.map(item => (
                        <li key={item.id}>
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </main>


        </div>
    );
}
export default DetailPage;