import React from 'react'
import { Route, BrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import DetailPage from './pages/DetailPage'

const Routes = () => (
    <BrowserRouter basename="laraveltest/public/">
        <Route component={Home} path="/" exact />
        <Route component={DetailPage} path="/detail-page" />
    </BrowserRouter>
)

export default Routes;