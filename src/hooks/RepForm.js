import { useState } from 'react';


export const RepForm = ( initialState = {} ) => {
    
    const [FormValues, setValues] = useState(initialState);

    const reset = ( newFormState = initialState ) => {
        setValues( newFormState );
    }


    const handleChange = ({ target }) => {

        setValues({
            ...FormValues,
            [ target.name ]: target.FormValues
        });

    }

    return [ FormValues, handleChange, reset ];

}
