import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword} from '../../actions/auth';

import logo from '../../imgs/logo.png'

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui );// aqui recibimos el estado del ui del cual desestructuramos que solo ocupamos el loading para mandarlo ejecutar en el bonton

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const [passShowedLogin, setPassShowedLogin] = useState(false)

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLoginEmailPassword( email, password ) );
    }



    return (
    
            <>
            <div className="container-fluid h-100">
                <div className="row text-center login-page">
                    <div className="col-md-12 login-form">
                        <div className="row">
                            <div className="col-md-12 login-form-header">
                                <img src={logo} className="img-fluid" width="50%" />
                            </div>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="form-outline mt-4 mb-4 text-center">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"
                                            style={{ color: 'white', background: '#3b693c'}}>       
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>
                                    <input type="text"
                                        placeholder="Correo electrónico"
                                        name="email"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        className="form-control form-control-lg"
                                        autoComplete="off"
                                        value={email}
                                        onChange={handleInputChange} />
                                </div>

                            </div>
                            <div className="form-outline mb-3 text-center">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"
                                            style={{ color: 'white', background: '#3b693c'}}>
                                            <i className="fas fa-key"></i>
                                        </span>
                                    </div>
                                    <input
                                        type={passShowedLogin ? "text" : "password"}
                                        placeholder="Contraseña"
                                        name="password"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        className="form-control form-control-lg"
                                        value={password}
                                        onChange={handleInputChange} />
                                    <div className="input-group-append">
                                        <button className="btn btn-danger" type="button"
                                            onClick={() => setPassShowedLogin(!passShowedLogin)}>
                                            <i className={passShowedLogin ? "fa fa-eye-slash" : "fa fa-eye"}
                                                aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center text-lg-start mt-4 mb-4 pt-2">
                                <button type="submit" className="btn btn-danger btn-large" disabled={loading}
                                    style={{ 'paddingLeft': '2.5rem', 'paddingRight': '2.5rem', fontSize: '18px' }}>
                                    Iniciar sesión
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
