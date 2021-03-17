import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Home from './pages/Home'
import CreateUser from './pages/CreateUser'
import CreateGroup from './pages/CreateGroup'
import Layout from './pages/GroupPage/components/Layout'
import LayoutUserPage from './pages/UserPage/components/LayoutUserPage'
import UpdateUser from './pages/UpdateUser '

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route component={Home} path="/" exact />
                <Route component={CreateUser} path="/CreateUser" />
                <Route component={CreateGroup} path="/CreateGroup" />
                <Route component={Layout} path="/groups_page" />
                <Route component={LayoutUserPage} path="/user_page" />
                <Route path="/updateUser_page/:id_user" component={UpdateUser} />
            </Switch>
        </Router>

    )
}

export default Routes