import React, { useState, useEffect , useCallback} from 'react';
import TextField from '@material-ui/core/TextField';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { ajax } from 'rxjs/ajax'
import { of  } from 'rxjs';
import { map ,  catchError } from 'rxjs/operators';

const LocationSearchInput = ({ field , form: {touched , errors } , ...props}) => {
    const [ result , setResult ] = useState([]);;
    
    const callSearchApi = ( query ) => {
      return ajax.getJSON(`/api/search?place=${query}`).pipe(
           map(response => response.message.features.map(res => res.text)),
           catchError(error => of(error))
       );
    };

    const invokeSearchWithDebounce = debounce(() => {
        const value = get(field , "value" , null);
        value && value !== '' && callSearchApi(field.value).subscribe(res => {
            console.log("response from seaarch ==> ",res);
            setResult(res);
        })
    },1000);

    useEffect(() => {
        invokeSearchWithDebounce();
    } , [field.value])

    return <div>
            <TextField {...field } {...props} value={field.value} fullWidth placeholder="Enter name of the place" />
        </div>
}

export default LocationSearchInput;