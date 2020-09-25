import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

const DetailPage = () => {

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
            </main>


        </div>
    );
}
export default DetailPage;