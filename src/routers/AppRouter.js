import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';

import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);// esta bandera es para ver si esta autentificado el usuario para darle paso al usuario 
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);// aqui vemos que si esta autentificado con un true o false poniendo rutas publicas y privadas


// aqui estamos haciendo que se mantenga el estado de nuestro logueo en nuestra aplicacion
    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async(user) => {
// aqui vemos si esta autentificado con el user .uid que es nuestro identificador que tenemos en nuestro fire base
            if ( user?.uid ) { 
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
                dispatch( startLoadingNotes( user.uid ) );// aqui estamos cargando las notas le mndamos el id del usuarion para que lo ejecute en actions/notes.js

            } else {
                setIsLoggedIn( false );
            }

            setChecking(false);

        });
        
    }, [ dispatch, setChecking, setIsLoggedIn ])


    if ( checking ) {
        return (
            <h1>Wait...</h1>
        )
    }

    
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute 
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
