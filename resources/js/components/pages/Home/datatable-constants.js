import React from 'react';
import styled from 'styled-components';
import { FiEdit, FiDelete } from 'react-icons/fi'
import { Link } from 'react-router-dom'


export const ClearButton = styled.button
    `border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 34px;
    width: 32px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;`;

export const TextField = styled.input`
    height: 32px;
    width: 200px;
    border-radius: 3px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #e5e5e5;
    padding: 0 32px 0 16px;
  
    &:hover {
      cursor: pointer;
    }`;

export const columns = [
    { name: 'id', selector: row => row.product.id, grow: 1, center: true },
    { name: 'image', selector: row => row.image.path, cell: (row) => imageThumb(row), center: true },
    { name: 'ref', selector: 'product.ref', grow: .2 },
    { name: 'name', selector: row => row.product.name, grow: 3 },
    { name: 'category', selector: row => row.category.name },
    { name: 'price', selector: 'product.price' },
    { name: 'quantity', selector: 'product.quantity' },
    { name: 'active', selector: 'product.active', cell: (row) => isActive(row) },
    { name: '', selector: 'product.active', cell: (row) => rowOptions(row) },
]

function isActive(row) {
    row
    if (row.product.active) {
        return (<div className="status active"></div>)
    }
    return (<div className="status"></div>)
}

function imageThumb(row) {
    const path = row.image?.path;
    return (<div className="image-thumb-container" ><img className="image-thumb" src={'storage/images/' + path}></img></div>)
}

function rowOptions(row) {
    return (
        <div>
            <button className="update-button">
                <Link to={{ pathname: '/edit-page', state: { id: row.product.id } }} >
                    <span>
                        <FiEdit />
                    </span>
                    d
                </Link>
            </button>
        </div>
    )
}

