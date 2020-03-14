import React, { useState, useEffect, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Label from '@material-ui/core/InputLabel'

let debouncedSearchApi;

const LocationSearchInput = ({ field, form: { touched, errors }, ...props }) => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const callSearchApi = (query) => {
        return ajax.getJSON(`/api/search?place=${query}`).pipe(
            map(response => response.message.features.map(res => ({
                id: res.id,
                short_name: res.text,
                long_name:res.place_name,
                geometry: res.geometry
            }))),
            catchError(error => of(error))
        );
    };

    const handleOnChange = useCallback((e , v) => {
        props.selectPlace(v);
    });

    useEffect(() => {
        debouncedSearchApi = debounce((value) => {
            if (value && value !== '') {
                setLoading(true);
                callSearchApi(value).subscribe(result => {
                    setResult(result);
                    setLoading(false);
                });
            }
        }, 500);
    }, []);

    useEffect(() => {
       debouncedSearchApi(field.value);
    }, [field.value])

    return <Autocomplete
        id='location-search-input'
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        getOptionSelected={(option, value) => option.id === value.id}
        getOptionLabel={option => option.long_name}
        options={result}
        loading={loading}
        onChange={handleOnChange}
        renderInput={params => (
            <TextField {...params}
                {...field}
                label={props.label}
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                    ),
                }} />
        )} />
}

export default LocationSearchInput;