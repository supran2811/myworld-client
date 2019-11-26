import * as React from 'react';
import {Form , FormField , TextInput , Button , Box } from 'grommet';
import _ from 'lodash';

const SignupForm = (props) => {

    const [ userFormData , setUserFormData ] = React.useState({
        userName: {
            type: 'text',
            name:'username',
            label: 'UserName',
            value: '',
            validation : {
                required:true,
                regExp: ''
            },
            placeholder: 'Enter unique username or generate',
            error: 'Username already in use'
        },
        name : {
            type: 'text',
            name:'name',
            label: 'Name',
            value: '',
            validation: {
                required:true,
                regExp: ''
            },
            placeholder: 'For Ex - John Wick',
            error: 'Name is not valid'
        },
        email: {
            type: 'email',
            name:'email',
            label: 'Email',
            value: '',
            validation: {
                required: true,
                regExp: ''
            },
            placeholder : 'For Ex john@email.com',
            error: 'Email is not valid'
        },
        password: {
            type: 'password',
            name:'password',
            label:'Password',
            value:'',
            validation: {
                required:true,
                regExp: ''
            },
            placeholder: 'Enter your password',
            error:'Password is not valid'
        }
    });

    const changeHandler = React.useCallback((e , key) => {
        const newValue = e.target.value;
        const userFormDataForKey = _.get(userFormData,key);
        const updatedUserFormData = {...userFormData , [key] : {...userFormDataForKey , value:newValue}};
        console.log(updatedUserFormData)
        setUserFormData(updatedUserFormData);
    });

    const signUpFormUI = _.keys(userFormData).map(key => {

        const { placeholder , value , validation , name,type }  = userFormData[key];
        const keysToOmitForFormField = ['validation','value','placeholder','error','type'];
        const formFieldData = { ..._.omit(userFormData[key],keysToOmitForFormField)};
        return <FormField {...formFieldData} key={key}>
                <TextInput 
                    placeholder={placeholder}
                    value={value}
                    type={type}
                    onChange = {(e) => changeHandler(e,key)}
                />
        </FormField>   
    })

    

    return (
        <Form onSubmit={({ value }) => props.doSignup(value)}
        value={userFormData}>
            {signUpFormUI}
            <Box direction="row" justify="between" margin={{ top: "medium" }}>
                <Button label="Cancel" />
                <Button type="submit" label="Submit" primary />
            </Box>
        </Form>
    );
}

export default SignupForm;