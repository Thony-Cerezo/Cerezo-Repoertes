import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import { NotesAppBar } from './NotesAppBar';
import { RepForm } from '../../hooks/RepForm';
import { activeNote, startDeleting } from '../../actions/notes';

import{TipoBD,ServerBD,AWSBD,SERSARRH7BD,SCEREZO03BD,CLOUDSQLBD } from '../../Data/BaseDatos'


  

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const [getTipo] = useState();

    const { active:note } = useSelector( state => state.notes );  //aqui estamos hacieo capas de modificar los valoress al seleccionarla ya qie en el estado estamos tomando el estado actual y lo igualamos 
    // y cambiamos por el nuevo estado 
    const [ FormValues, reset,handleChange] = RepForm( 
{
    Nombre:'',
    Clave:'',
    Unidad:'',
    Tipo:'',
    Servidor:'',
    BaseDatos:'',
    Dependencia:'',
    Presupuesto:'',

}   );
    const {Nombre,Clave,Tipo,Unidad,Servidor,BaseDatos,Dependencia,Presupuesto} = FormValues; // el title y body se los asiganmos al name de los inputs para poderlos manipular

    console.log(FormValues);
// este use efect va a observar cuando cambia el estado la nota osea cuando la estamos editando
   
const handleInputTipo = ({value}) => {
    console.log(value);
   
}


    // useEffect(() => {
        
    //     dispatch( activeNote(values, { ...values } ) );

    // }, [values, dispatch])


    const handleDelete = () => {
        dispatch( startDeleting( ) );
    }
  
 
 

    return (
<>
<div className="container-fluid myform">
    <div className="box4">
        <div id="TITLE"> REGISTRO DE REPORTES </div>
    </div>
    <div className="container-fluid box">
        <div className="row font" >

      


            <div className="col-12 col-lg-2">
                <label>TIPO:</label>
               
                <Select
                // defaultValue = { suppliers[0] } 
                value={Tipo}
                options = { TipoBD }
                onChange = { handleInputTipo }
                name="Tipo"
               
                
            />
             
            </div>
            <div className="col-12 col-lg-3">
                <label>SERVIDOR</label>
                <Select
                // defaultValue = { suppliers[0] }
                options = { ServerBD }
                onChange = { handleInputTipo }
            />
             
                {/* <Select
                    options={cecos}
                    autoFocus={false}
                    onChange={(e) => {
                        handleChangeForm("ceco", e, "form");
                    }}
                    isSearchable={metadata.rol == 'adm'}
                    value={chosenCeco}
                    isDisabled={cecos.length <= 0}
                    placeholder="RANCHO.."
                /> */}
            </div>
            <div className="col-12 col-lg-3">
                <label>BASE DE DATOS</label>
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" >
                <option selected>Selecciona el Servidor</option>
            
                </select>
                {/* <Select
                    options={returnValidSems(semanas)}
                    autoFocus={false}
                    isSearchable={metadata.rol == 'adm'}
                    onChange={(e) => {
                        handleChangeForm("semana", e, "form");
                    }}
                    value={chosenSemana}
                    isDisabled={semanas.length <= 0}
                    placeholder="SEMANA..."
                /> */}
            </div>
            <div className="col-12 col-lg-4">
                <label>
                    DEPENDENCIA
                    {/* {chosenAct &&
                        "(" + (chosenAct?.etapa) + ")"} */}
                </label>
                
                <input type="text" 
                placeholder="" 
                name="Dependencia" 
                className="auth__input form-control"
                 value={Dependencia}
                onChange={handleChange}
               
                />
            </div>

            <div className="col-12 col-lg-4">
                <label>
                        PRESUPUESTO
                    {/* {chosenAct &&
                        "(" + (chosenAct?.etapa) + ")"} */}
                </label>
                
                <input type="text"
                 placeholder=""
                  name="Presupuesto" 
                  className="auth__input form-control"
                  value={Presupuesto}
                  onChange={handleChange}
                  
                  />
            </div>
           
        </div>
        <div className="row text-center mt-3">
            <div className="col-12 col-lg-12 align-self-end">
                <button
                    type="button"
                    className="btn btn-success btn-lg btn-block font"
                    id="registrar"
                    name='registar'
                    style={{ fontSize: '28px' }}
                    // disabled={checkFields()}
                    // onClick={(e) => {
                    //     handleSubmit();
                    // }}
                >
                    <span className="fas fa-save font" aria-hidden="true"></span>{" "}
                    REGISTRAR
                </button>
            </div>
        </div>
    </div>
</div>
</>

        // <div className="notes__main-content">
            
        //     <NotesAppBar />

        //     <div className="notes__content">

        //         <input 
        //             type="text"
        //             placeholder="Some awesome title"
        //             className="notes__title-input"
        //             autoComplete="off"
        //             name="title"
        //             value={ title }
        //             onChange={ handleInputChange }
        //         />

        //         <textarea
        //             placeholder="What happened today"
        //             className="notes__textarea"
        //             name="body"
        //             value={ body }
        //             onChange={ handleInputChange }
        //         ></textarea>

        //         {
        //             (note.url) 
        //             && (
        //                 <div className="notes__image">
        //                     <img 
        //                         src={ note.url }
        //                         alt="imagen"
        //                     />
        //                 </div>
        //             )
        //         }


        //     </div>


        //     <button 
        //         className="btn btn-danger"
        //         onClick={ handleDelete }
        //     >
        //         Delete
        //     </button>

        // </div>
    )
}
