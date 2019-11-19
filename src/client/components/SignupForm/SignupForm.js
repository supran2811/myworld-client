import * as React from 'react';
import {Form , FormField , TextInput } from 'grommet';

const SignupForm = (props) => {
    return (<Form>
        <FormField label="Label" htmlFor="text-input">
            <TextInput
                id="text-input"
                placeholder="placeholder"
           />
        </FormField>
    </Form>);
}

export default SignupForm;