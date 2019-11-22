import * as React from 'react';
import {Form , FormField , TextInput , Button , Box } from 'grommet';
import _ from 'lodash';

const LoginForm = () => {

    const [ loginFormData , setLoginFormData ] = React.useState({
        userName: {
            type: 'text',
            name:'username',
            label: 'UserName',
            value: '',
            validation : {
                required:true,
                regExp: ''
            },
            placeholder: 'Enter Username or Email'
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
        const loginFormDataForKey = _.get(loginFormData,key);
        const updatedLoginFormData = {...loginFormData , [key] : {...loginFormDataForKey , value:newValue}};
        console.log(updatedLoginFormData)
        setLoginFormData(updatedLoginFormData);
    });

    const loginFormUI = _.keys(loginFormData).map(key => {

        const { placeholder , value , validation , name,type }  = loginFormData[key];
        const keysToOmitForFormField = ['validation','value','placeholder','error','type'];
        const formFieldData = { ..._.omit(loginFormData[key],keysToOmitForFormField)};
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
        <Form onSubmit={({ value }) => console.log("Submit", value)}
        value={loginFormData}>
            {loginFormUI}
            <Box direction="row" justify="between" margin={{ top: "medium" }}>
                <Button label="Cancel" />
                <Button type="submit" label="Submit" primary />
            </Box>
        </Form>
    );
}

export default LoginForm;