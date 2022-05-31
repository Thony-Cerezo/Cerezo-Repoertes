import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { startErr, startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import favicon from '../../assets/favicon.png';
import { useForm } from '../../hooks/useForm';
import {  removeError } from '../../actions/ui'; 
import { NoteScreen } from '../notes/NoteScreen';

export const Sidebar = () => {

    const dispatch = useDispatch();
    const  {msgError} = useSelector( state => state.ui );
    console.log(msgError);

    const hanleLogout = () => {// aqui hacemos la accion de un dispach de que queremos que se salga de la apicacion lo mandamos llamar en el boton 
        dispatch( startLogout() )
    }



    const handleGenerar =(e)=> {
      e.preventDefault();
    if(isFormValid()){
      dispatch( startNewNote() );
     
    }
    }

    const [ values,handleInputChange] = useForm ({
      nombre:'Reporte',
      clave:'2134',
      unidad: 'Tangancicuaro',
    });
     const {nombre,clave,unidad} = values;

    console.log(values);

// validacion del formulario 
    const isFormValid = () => {
        
      if ( nombre.trim().length === 0 ) {
          dispatch( startErr('El nombre es requerido') )
         
          return false;
      } else  if ( clave.trim().length === 0 ) {
        dispatch( startErr('La clave es requerida') )
       
        return false;
      } else  if ( unidad.trim().length === 0 ) {
        dispatch( startErr('La unidad es Requerida') )
      
        return false;
      }
      
      dispatch( removeError() );
     return true;
  }


    return (
        <div className='container'>
        <div className='row'>
        <aside className='journal__sidebar'>
          <div className='col order-first'>
            <div className='journal_sidebar-navbar'>
                <h3 className='mt-3'>
                <i className="fas fa-laptop fa-2x"></i>
                <i className="fas fa-marker"></i>
                    <span> REPORTES</span>
                </h3>
              
            </div>
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className=""></i>
                    
                    <span> { 
                    msgError }</span>
                </h3>

                <button 
                    className="logut fa-solid fa-user"
                    onClick={ hanleLogout }
                >
                    Logout
                </button>
            </div>
    
    
            <div className='journal__new-entry'>
              <form onSubmit={handleGenerar} >
            <div className="mb-3">
            
            <label  className="form-label formGroupExampleInput">Nombre</label>
              <input 
              className="form-control auth__input"
              type="text"
              placeholder=''
              name='nombre'
              autoComplete='off'
              value={nombre}
              onChange={handleInputChange}
              />
    </div>
    <div className="mb-3">
              <label  className="form-label">Clave</label>
               <input 
               
              type="text"
              placeholder=''
              name='clave'
              className='auth__input form-control'
              autoComplete='off'
              value={clave}
              onChange={handleInputChange}
              />
              </div>
              <div className="mb-3">
                <label  className="form-label">Unidad</label>
               <input 
               className="form-control auth__input"
              type="text"
              placeholder=''
              name='unidad'
              autoComplete='off'
              value={unidad}
              onChange={handleInputChange}
              />
              </div>
              <button  className="btn generar btn-large" type="submit"
            style={{ 'paddingLeft': '2.5rem', 'paddingRight': '2.5rem', fontSize: '18px' }}>
                LLENAR REPORTE
             </button>
              
               <div >
                <img src={favicon} alt='Logo del cerezo' className='Logo_main_Cereso rounded float-end'/>
    
            </div>
            </form>
            </div>
         
    </div>
      {/* <div className='container'>
           
          <JournalEntries/>
          </div> */}
        </aside>
        </div>
        </div>
    )
}
