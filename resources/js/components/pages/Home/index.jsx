import DataTable from 'react-data-table-component'
import * as DatatableConstants from './datatable-constants'
import api from '../../services/api'
import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import differenceBy from 'lodash/differenceBy';

import './style.css'

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <DatatableConstants.TextField id="search" type="text" placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={onFilter} />
        <DatatableConstants.ClearButton type="button" onClick={onClear}>X</DatatableConstants.ClearButton>
    </>
);

const AddButton =
    <button className="">
        <Link to='/create-page' >
            <span>
                <FiPlus />
            </span>
            <strong>Add Product</strong>
        </Link>
    </button>
    ;

const Home = () => {

    const [products, setProducts] = useState([])
    const [filterText, setFilterText] = useState('');

    const [toggleCleared, setToggleCleared] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);

    const filteredItems = products.filter(
        item => item.product.name && item.product.name.toLowerCase()
            .includes(filterText.toLowerCase()));

    useEffect(() => {
        api.get('products').then(response => {
            setProducts(response.data)
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

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {

            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.product.name)}?`)) {
                setToggleCleared(!toggleCleared);
                setProducts(differenceBy(products, selectedRows, 'product.id'));
            }
        };

        return <button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>Delete</button>;
    }, [filteredItems, selectedRows, toggleCleared]);

    return (
        <main>
            <div className="container">
                <DataTable
                    title="Products"
                    columns={DatatableConstants.columns}
                    data={filteredItems}
                    pagination
                    subHeader
                    selectableRows
                    selectableRowsNoSelectAll
                    actions={AddButton}
                    contextActions={contextActions}
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={toggleCleared}
                    subHeaderComponent={subHeaderComponentMemo}
                />
            </div>
        </main>
    )
}

export default Home;