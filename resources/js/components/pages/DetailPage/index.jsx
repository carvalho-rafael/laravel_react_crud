import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Edit from './edit';
import Create from './create';

const DetailPage = (props) => {
    const id = props.location.state.id;



    return (
        <div>
            <header>
                <div className="logo">
                    <h2></h2>
                </div>
                <Link to="/">
                    <FiArrowLeft />
                        Products List
                    </Link>
            </header>
            <main>
                <Edit id={id}></Edit>
                <Create></Create>
            </main>


        </div>
    );
}
export default DetailPage;