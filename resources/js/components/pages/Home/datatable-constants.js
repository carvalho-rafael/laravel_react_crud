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
    { name: 'id', selector: 'id' },
    { name: 'ref', selector: 'ref' },
    { name: 'name', selector: 'name' },
    { name: 'category', selector: 'category' },
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

function rowOptions(row) {
    return (
        <div>

        </div>
    )
}

