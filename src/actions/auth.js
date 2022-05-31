import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { startLoading, finishLoading, setError } from './ui';
import { noteLogout } from './notes';


export const startLoginEmailPassword = (email, password) => {
    return async (dispatch) => {
// aqui se disparan las acciones desde el ui.js el uiReducer.js aqui los ejecutamos 
        dispatch( startLoading() );
        
        
        try {
            const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
            dispatch(login(user.uid, user.displayName));

            dispatch(finishLoading());
        } catch (e) {
            console.log(e);
            dispatch(finishLoading());
            Swal.fire('Error', e.message, 'error');
        }

    }
}

export const startErr = (err) => {
    return async (dispatch) => {
// aqui se disparan las acciones desde el ui.js el uiReducer.js aqui los ejecutamos 
        dispatch( setError() );
         Swal.fire('Error', err, 'error');
    }
}




//aqui estamos disparando la accion que vamos a grabar en firebase 

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {

                await user.updateProfile({ displayName: name });

                dispatch(
                    login( user.uid, user.displayName )
                );
            })
            .catch( e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            })

    }
}



export const startGoogleLogin = () => {
    return ( dispatch ) => {

        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
            });

    }
}


export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

/// este es el dispathc donde aremos el logout el cual dispararemos desde el boton en el sideBar
export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );// aqui borraremos del store la informaciion del usuario logueado actual 
        dispatch( noteLogout() );
    }
}


export const logout = () => ({
    type: types.logout
})


