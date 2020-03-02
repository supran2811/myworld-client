import * as React from 'react';
import _ from 'lodash';
import { string as yupString } from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import intl from 'react-intl-universal';

import useStyles from './SignupForm.style';

const SignupForm = (props) => {
    const classes = useStyles();
    const [userFormData, setUserFormData] = React.useState({
        username: {
            type: 'text',
            name: 'username',
            label: intl.get('LOGIN_LABEL_USERNAME'),
            value: '',
            validation: {
                required: true,
                regexp: /[0-9a-zA-Z]{6,}/
            },
            placeholder: null,
            error: false,
            helperText: intl.get('SIGNUP_LABEL_ERROR_USERNAME')
        },
        name: {
            type: 'text',
            name: 'name',
            label: intl.get('SIGNUP_LABEL_FULLNAME'),
            value: '',
            validation: {
                required: true,
                regexp: /[0-9a-zA-Z]{6,}/
            },
            placeholder: intl.get('SIGNUP_LABEL_FULLNAME_PLACEHOLDER'),
            error: false,
            helperText: intl.get('SIGNUP_LABEL_FULLNAME_ERROR')
        },
        email: {
            type: 'email',
            name: 'email',
            label: intl.get('SIGNUP_LABEL_EMAIL'),
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            placeholder: intl.get('SIGNUP_EMAIL_PLACEHOLDER'),
            error: false,
            helperText: intl.get('SIGNUP_EMAIL_ERROR')
        },
        password: {
            type: 'password',
            name: 'password',
            label: intl.get('LOGIN_LABEL_PASSWORD'),
            value: '',
            validation: {
                required: true,
                regexp: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            },
            placeholder: intl.get('LOGIN_LABEL_PASSWORD_PLACEHOLDER'),
            error: false,
            helperText: intl.get('SIGNUP_LABEL_PASSWORD_ERROR')
        },
        confirmPassword: {
            type: 'password',
            name: 'confirmPassword',
            label: intl.get('SIGNUP_LABEL_CONFIRM_PASSWORD'),
            value: '',
            validation: {
                required: true
            },
            placeholder: intl.get('SIGNUP_LABEL_PASSWORD_PLACEHOLDER'),
            error: false,
            helperText: intl.get('SIGNUP_LABEL_CONFIRM_PASSWORD_ERROR')
        }
    });

    const changeHandler = React.useCallback(async (e, key) => {
        const newValue = e.target.value;
        const userFormDataForKey = _.get(userFormData, key);
        const { validation: { required, regexp, isEmail }, name } = userFormDataForKey
        let error;
        if (regexp) {
            const schema = yupString().matches(regexp, { excludeEmptyString: false });
            error = !(await schema.isValid(newValue));
        }
        else if (isEmail) {
            const schema = yupString().email();
            error = !(await schema.isValid(newValue));
            console.log("Error for", key, error);
        }
        else if (key === 'confirmPassword') {
            const { value } = _.get(userFormData, 'password');
            error = newValue !== value;
        }

        const updatedUserFormData = { ...userFormData, [key]: { ...userFormDataForKey, value: newValue, error } };
        //console.log(updatedUserFormData)
        setUserFormData(updatedUserFormData);
    });

    const handleFormSubmit = React.useCallback((e) => {
        e.preventDefault();
        let data;
        for (const key in userFormData) {
            const userFormDataForKey = _.get(userFormData, key);
            const { value, validation: { required }, error } = userFormDataForKey;
            if (required && _.isEmpty(value)) {
                data = null;
                const updatedUserFormData = { ...userFormData, [key]: { ...userFormDataForKey, error: true } };
                setUserFormData(updatedUserFormData);
                break;
            }
            else if (error) {
                data = null;
                break;
            }
            data = { ...data, [key]: value };
        }
        console.log("Date to send", data);
        if (data) {
            props.doSignup(data);
        }
    });

    const signUpFormUI = _.keys(userFormData).map(key => {

        const { placeholder, value, validation, name, type, label, error, helperText } = userFormData[key];
        return <Grid item xs={12} key={name}>
            <TextField
                autoComplete={name}
                name={name}
                variant="outlined"
                required={validation.required}
                fullWidth
                id={name}
                label={label}
                placeholder={placeholder}
                value={value}
                type={type}
                onChange={(e) => changeHandler(e, key)}
                error={error}
                helperText={error ? helperText : null}
            />
        </Grid>
    })
    const { error } = props;

    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {intl.get('SIGNUP_LABEL_HEADER_TEXT')}
            </Typography>
            {
                error &&
                <Typography component="p" variant="subtitle2" color="error">
                    { intl.get('AUTH_ERROR_LABEL') + (_.get(error , "response.message",null) ||  _.get(error , "message") )}
                </Typography>
            }
            <form onSubmit={handleFormSubmit} className={classes.form} noValidate>
                <Grid container spacing={2}>
                    {signUpFormUI}
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    {intl.get('SIGNUP_LABEL_HEADER_TEXT')}
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link component={RouterLink} to="/login" variant="body2">
                            {intl.get('SIGNUP_GOTO_LOGIN')}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default SignupForm;