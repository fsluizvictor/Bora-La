import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import CreateUser from './pages/CreateUser'
import CreateGroup from './pages/CreateGroup'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreateUser} path="/CreateUser" />
            <Route component={CreateGroup} path="/CreateGroup" />
        </BrowserRouter>

    )
}

export default Routes