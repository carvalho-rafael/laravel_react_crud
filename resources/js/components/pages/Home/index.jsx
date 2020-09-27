import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import * as DatatableConstants from './datatable-constants'
import api from '../../services/api'
import React, { useEffect, useState } from 'react';
import './style.css'

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <AddButtonComponent>Add Product</AddButtonComponent>
        <DatatableConstants.TextField id="search" type="text" placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={onFilter} />
        <DatatableConstants.ClearButton type="button" onClick={onClear}>X</DatatableConstants.ClearButton>
    </>
);

const AddButtonComponent = () => (
    <>
        <button className="add-button">
            <Link to="/detail-page">
                <span>
                    <FiPlus />
                </span>
                <strong>Add Product</strong>
            </Link>
        </button>
    </>
);

const Home = () => {

    const [filterText, setFilterText] = useState('');
    const [products, setProducts] = useState([])
    const filteredItems = products.filter(
        item => item.name && item.name.toLowerCase()
            .includes(filterText.toLowerCase()));

    useEffect(() => {
        api.get('products').then(response => {
            setProducts(response.data)

            console.log(products)
        })

    }, [])

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setFilterText('');
            }
        };
        return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
    }, [filterText]);

    return (
        <div id="page-home">
            <div className="content">
                <main>
                    <div className="container">
                        <DataTable
                            title="Products"
                            columns={DatatableConstants.columns}
                            data={filteredItems}
                            pagination
                            subHeader
                            subHeaderComponent={subHeaderComponentMemo}
                            persistTableHead
                        />
                    </div>

                </main>
            </div>

        </div>
    )
}

export default Home;