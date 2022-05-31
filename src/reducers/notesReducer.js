/*
    {
        notes: [], va a tener un objeto donde se les podra hcaer clic sobre ellas
        active: null, el active null es que no hay ninguna nota seleccionada
        active: {
            id: 'KASKLDJALKSDJ129387123',
            title: '',
            body: '',
            imageUrl: '',
            date: 12387612387126
        }
    }
*/

import { types } from '../types/types';

const initialState = {
    notes: [],
    active: null
}


export const notesReducer = ( state = initialState, action ) => {

    switch (action.type) {
        //aqui viene el dispach de actions notes.js 
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        
        case  types.notesAddNew:
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }
//aqui es donde ejecutamos la accion y establecemos las notas en el store
        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }
    
            //aqui vamos a ejecutar que vamos a actualizar las notas 
        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map(   
                    note => note.id === action.payload.id//solo modificaremos la nota que nos interesa viendo que id de nuestra nota sea el que esta en el paylosd
                        ? action.payload.note 
                        : note
                )
            }

            // aqui recibimos la aciom de aut/notes.js 
        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload )
            } 

        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }

        default:
            return state
    }


}