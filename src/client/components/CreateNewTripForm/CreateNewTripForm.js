

import React, { useState, Fragment, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
// import { TextField } from 'formik-material-ui';
import { Button, LinearProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import FormTextField from '../common/FormTextField/FormTextField';
import {
  TimePicker,
  DatePicker,
  DateTimePicker,
} from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import LocatioSearchInput from '../common/LocationSearchInput'
import styles from './CreateNewTripForm.style';


const getPlaceObjectToAdd = () => ({
  place: {},
  startDate: new Date(),
  endDate: new Date()
})

const updatePlaceObject = (newPoi, place) => {
  return {
    place: newPoi,
    ...place
  }
}

const CreateNewTripForm = (props) => {
  const classes = styles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik initialValues={{
        tripTitle: '',
        places: [getPlaceObjectToAdd()]
      }}
        onSubmit={(values, isSubmitting) => {
          console.log("Submitting value", values)
        }}
      >
        {({ values, submitForm, isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field name="tripTitle">
                  {
                    (field, form, meta) => (
                      <TextField {...field} variant='outlined' fullWidth={true} placeholder="Enter trip name" />
                    )
                  }
                </Field>
              </Grid>
              <FieldArray
                name="places"
                render={
                  arrayHelpers => (
                    <>
                      {
                        values.places && values.places.map((place, index) => (
                          <Grid container spacing={3} key= {index} className={classes.grid}>
                            <Grid item xs={6}>
                              <Field component={LocatioSearchInput} name="place" label="Place" selectPlace={(v) => arrayHelpers.replace(index, updatePlaceObject(v, place))} />
                            </Grid>
                            <Grid item xs={2}>
                              <Field component={DatePicker} name="date" label="From Date" value={place.startDate} />
                            </Grid>
                            <Grid item xs={2}>
                              <Field component={DatePicker} name="date" label="Till Date" value={place.endDate} />
                            </Grid>
                            <Grid item xs={1}>
                              <Button variant="contained" color="primary" onClick={() => arrayHelpers.insert(index, getPlaceObjectToAdd())}>Add</Button>
                            </Grid>
                            <Grid item xs={1}>
                              <Button variant="contained" color="secondary" disabled={values.places.length === 1} onClick={() => arrayHelpers.remove(index)}>Remove</Button>
                            </Grid>
                          </Grid>
                        ))
                      }
                    </>
                  )
                }
              />
              <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={1}>
                  <Button type="submit" variant="contained" color="primary">Create</Button>
                </Grid>
                <Grid item xs={1}>
                  <Button variant="contained" color="secondary">Cancel</Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
}

export default CreateNewTripForm;