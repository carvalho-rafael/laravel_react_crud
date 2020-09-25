import React from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Home = () => {
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
                </main>
            </div>

        </div>
    )
}

export default Home;