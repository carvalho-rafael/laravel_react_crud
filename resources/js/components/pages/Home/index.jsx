import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import api from '../../services/api'
import React, { useEffect, useState } from 'react';
import './style.css'

const Home = () => {

    const [products, setProducts] = useState([])

    function isActive(row) {
        if (row.active) {
            return (<div className="status active"></div>)
        }
        return (<div className="status"></div>)
    }

    function rowOptions(row) {
        return (
            <div>

            </div>
        )
    }

    useEffect(() => {
        api.get('products').then(response => {
            setProducts(response.data.data)
        })

    }, [])

    const handlePageChange = page => {
        api.get('products?page=' + page).then(response => {
            setProducts(response.data.data)
        })
    }

    const columns = [
        { name: 'ref', selector: 'ref' },
        { name: 'name', selector: 'name' },
        { name: 'category', selector: 'category' },
        { name: 'price', selector: 'price' },
        { name: 'quantity', selector: 'quantity' },
        { name: 'active', selector: 'active', cell: (row) => isActive(row) },
        { name: '', selector: 'active', cell: (row) => rowOptions(row) },
    ]

    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <h2 className="logo-text">Home</h2>
                </header>
                <main>
                    <Link to="/detail-page">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>link</strong>
                    </Link>
                    <div className="container">
                        <DataTable
                            title="Products"
                            columns={columns}
                            data={products}
                            pagination
                            paginationServer
                            paginationTotalRows={244}
                            paginationPerPage={5}
                            onChangePage={handlePageChange}
                        />
                    </div>

                </main>
            </div>

        </div>
    )
}

export default Home;