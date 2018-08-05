import React from 'react';
import {HashRouter as Router, Route, Redirect} from 'react-router-dom';
// components
import Login from './Login.jsx';
import App from './App.jsx';

class Root extends React.Component {
    render() {
        return (
            <Router>
                <main>
                    <Route path='/' exact render={(props) => (
                        (!!localStorage.getItem('user'))
                            ? <Redirect to={{
                                pathname: '/store'
                            }}/>
                            : <Redirect to={{
                                pathname: '/login'
                            }}/>
                    )}/>
                    <Route path='/login' render={(props) => (
                        (!!localStorage.getItem('user'))
                            ? <Redirect to={{
                                pathname: '/store'
                            }}/>
                            : <Login/>
                    )}/>
                    <Route path='/store' render={(props) => (
                        (!!localStorage.getItem('user'))
                            ? <App/>
                            : <Redirect to={{
                                pathname: '/login'
                            }}/>
                    )}/>
                </main>
            </Router>
        )
    }
}

export default Root;