import React from 'react';
import {Redirect} from 'react-router-dom';
import * as request from 'superagent';
import {baseUrl} from '../configs/constants';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            processing: false,
            redirect: false, 
            error: '',
            email: '',
            password: ''
        };
    }

    handleInputChanges(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({processing: true});
        request.get(`${baseUrl}/users.json`)
            .end((err,res) => {
                if (err || !res.ok) {
                    this.setState({error: 'Error en la conexion al servidor.'})
                } else {
                    const result = res.body.filter((user) => {
                        return  user && 
                                user.email == this.state.email && 
                                user.password == this.state.password;
                    });

                    if (result.length > 0) {
                        localStorage.setItem('user', JSON.stringify(result[0]));
                        this.setState({redirect: true});
                    } else {
                        this.setState({error: 'Error en el inicio de sesión'});
                    }
                }
            })
    }

    invalidForm() {
        return !this.state.password || !this.state.email
    }

    render() {
        let error = '';
        let btnText = 'Ingresar';
        let redirect = '';

        if (this.state.error) {
            error = <div className="alert alert-danger mt-3">{this.state.error}</div>;
        }

        if (this.state.processing) {
            btnText = 'Verificando';
        }

        if (this.state.redirect === true) {
            redirect = <Redirect to='/store'/>;
        }

        return (
            <div className="login-page">
                {redirect}
                <div className="login-form">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="email">Correo elect&oacute;nico:</label>
                            <input type="email" 
                                name="email"
                                value={this.state.email} 
                                onChange={this.handleInputChanges.bind(this)}
                                className="form-control" 
                                id="email" 
                                required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contrase&ntilde;a:</label>
                            <input type="password" 
                                name="password" 
                                value={this.state.password}
                                onChange={this.handleInputChanges.bind(this)}
                                className="form-control" 
                                id="password" 
                                required/>
                        </div>
                        <div className="text-center">
                            <input type="submit"
                                disabled={this.processing}
                                value={btnText}
                                className="btn btn-success"/>
                        </div>
                    </form>
                    {error}
                </div>
            </div>
        )
    }
}

export default Login;