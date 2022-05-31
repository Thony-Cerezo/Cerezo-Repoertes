import { db } from '../firebase/firebase-config';



export const loadNotes = async ( uid ) => {

    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();
    const notes = [];

    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id, //nuevo elemento donde estamos guadrando lo que necesitmos.
            ...snapHijo.data()
        })
    });
    
    return notes;
}


// este helper nos ayudara a recoger los datos de firestore donde hacemos la referencia con el id del usuario despues la base de dstos y la tabla, todos esto en la 
//const notesSnap
// const notes []; tendra gusrdadas nuestrra notas las que le mandaremos a traves del la funcion notesSnap.forEach 
