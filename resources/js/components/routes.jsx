import React from 'react'
import { Route, BrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import Edit from './pages/DetailPage/edit'
import Create from './pages/DetailPage/create'

const Routes = () => (
    <BrowserRouter basename="laraveltest/public/">
        <Route component={Home} path="/" exact />
        <Route component={Edit} path="/edit-page" />
        <Route component={Create} path="/create-page" />
    </BrowserRouter>
)

export default Routes;