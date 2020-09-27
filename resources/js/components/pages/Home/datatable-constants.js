import React from 'react';
import styled from 'styled-components';

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
    { name: 'id', selector: (row, index) => row.id, grow: 1, center: true },
      { name: 'image', selector: (row, index) => row.images[0].path, cell: (row) => imageThumb(row)},
    { name: 'ref', selector: 'ref', grow:2 },
    { name: 'name', selector: 'name', grow: 4},
    { name: 'category', selector: (row, index) => row.category.name},
    { name: 'price', selector: 'price' },
    { name: 'quantity', selector: 'quantity' },
    { name: 'active', selector: 'active', cell: (row) => isActive(row) },
    { name: '', selector: 'active', cell: (row) => rowOptions(row) },
]

function isActive(row) {
    if (row.active) {
        return (<div className="status active"></div>)
    }
    return (<div className="status"></div>)
}

function imageThumb(row) {
    const path = row.images[0]?.path;
    if (path) {
        return (<img src={path}></img>)
    }
    return (<div className="status"></div>)
}

function rowOptions(row) {
    return (
        <div>

        </div>
    )
}

