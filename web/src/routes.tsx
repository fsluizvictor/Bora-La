import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import CreateUser from './pages/CreateUser'
import CreateGroup from './pages/CreateGroup'
import Layout from './pages/GroupPage/components/Layout'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreateUser} path="/CreateUser" />
            <Route component={CreateGroup} path="/CreateGroup" />
            <Route component={Layout} path="/groups_page" />
        </BrowserRouter>

    )
}

export default Routes