import { types } from '../types/types';


//  aqui estasmos viedo el error que sale lo recibimos como err por las tipes 
 export const setError = ( err ) => ({
     type: types.uiSetError,
     payload: err,
   
 });



export const removeError = () => ({
    type: types.uiRemoveError
});
//son aciones asincronas que mandamos ejecutar en el uiReducer.js
export const startLoading = () => ({
    type: types.uiStartLoading
})
export const finishLoading = () => ({
    type: types.uiFinishLoading
})

