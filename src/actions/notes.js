import Swal from 'sweetalert2';

import { db } from '../firebase/firebase-config';
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
import { fileUpload } from '../helpers/fileUpload';


export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime() //asi asignamos la fecha el momento de la insersion 
        }
//para grabar en fire store mandamos llamar rl db que viene de nuestra aplicacion de fire babe config
            // usamos el collection donde tomamos el uid del usauario que es el identificador de quien hara la insersion 
            // despues damos la referencia a donde guardaremos en este caso en fire base usamos la base journal y dentro de ella
           // tenemos la tabla notes.
           //para hacer una insercion controlada en nuetro fire store o base de datos le daremos la siguiente instruccion que solo
           //dejara hacer insersiones si tenemos un usuario logueado 
        //    allow.read, write: if tequest.auth != null
        // try {
            
        //     const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
    
        //     dispatch( activeNote( doc.id, newNote ) );
        //     dispatch( addNewNote( doc.id, newNote ) );
            
        // } catch (error) {
        //     console.log(error);
        // }


    }
}

//aqui estamos mandando agregar una nueva nota  el cal invocamos en el notes reducer, este active pide el id y la nota de auqui se pasa al notereducer.
export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

// aui hacemos lo del ap router de la carga de las nota recibiendo el id  del usuario
export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );

    }
}

// aqui cargamos las notas desde nuestro loaad notes que regresa notes, y aqui se recibe, entonces hacemos una accion osea el types 
//accion de cargar y qie vamos a cargar,, las notas con el payload que usamos con redux 
export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

/// aqui vamos a recibir la nota que ya trae su id e informacion, viene de 
export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if ( !note.url ){
            delete note.url;
        }
// necesitamos borrar el id de la nota ya que necesitamos actualizarlo 
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ) );
        Swal.fire('Saved', note.title, 'success');// ESta es un alert que aparece cuando se guarda correctamente la nota
    }
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});


export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) )
        

        Swal.close();
    }
}


export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {
         
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();//aqui estamos indicando donde vamos a borrar en este caso de la base de datos en fire base y le indicamos el ide del usuario
        // y su id de la nota para que la identifique 

        dispatch( deleteNote(id) ); // de aqui borramos la nota del estore asi que mandamos ejecutar esa accion 

    }
}
// esta seria la funcion que la va a borrar y lo implemetamos en el note reducer 
export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});


export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});
