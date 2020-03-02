import React , { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const CreateNewTripForm = ( props ) => {

    const [ formData , setFormData ] = useState({
        title : '',
        places : []
    });

    return (
        <form>
            <Grid xs={12}>
                <TextField />
            </Grid>
        </form>
    );
}

export default CreateNewTripForm;