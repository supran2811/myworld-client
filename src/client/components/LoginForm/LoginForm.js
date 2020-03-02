import * as React from 'react';
import _ from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import intl from 'react-intl-universal';
import useStyles from './LoginForm.style';

const LoginForm = (props) => {
    const classes = useStyles();
    const [loginFormData, setLoginFormData] = React.useState({
        username: {
            type: 'text',
            name: 'username',
            label: intl.get('LOGIN_LABEL_USERNAME'),
            value: '',
            validation: {
                required: true,
                regExp: ''
            },
            placeholder: intl.get('LOGIN_LABEL_USERNAME_PLACEHOLDER')
        },
        password: {
            type: 'password',
            name: 'password',
            label: intl.get('LOGIN_LABEL_PASSWORD'),
            value: '',
            validation: {
                required: true,
                regExp: ''
            },
            placeholder: intl.get('LOGIN_LABEL_PASSWORD_PLACEHOLDER'),
            error: intl.get('LOGIN_LABEL_ERROR_AUTH'),
        }
    });

    const changeHandler = React.useCallback((e, key) => {
        const newValue = e.target.value;
        const loginFormDataForKey = _.get(loginFormData, key);
        const updatedLoginFormData = { ...loginFormData, [key]: { ...loginFormDataForKey, value: newValue } };
        console.log(updatedLoginFormData)
        setLoginFormData(updatedLoginFormData);
    });

    const handleFormSubmit = React.useCallback((e) => {
        e.preventDefault();
        let data;
        for (const key in loginFormData) {
            const loginFormDataForKey = _.get(loginFormData, key);
            const { value } = loginFormDataForKey;
            if(_.isEmpty(value)) {
                data = null;
                break;
            }
            data = { ...data, [key]: value };
        }
        console.log("Date to send", data);
        if (data) {
            props.doLogin(data);
        }
    });

    const loginFormUI = _.keys(loginFormData).map(key => {

        const { placeholder, value, validation, name, type } = loginFormData[key];
        return <TextField
            key={name}
            variant="outlined"
            margin="normal"
            required={validation.required}
            fullWidth
            placeholder={placeholder}
            value={value}
            name={name}
            label={name}
            type={type}
            onChange={(e) => changeHandler(e, key)}
        />
    })
    const { error } = props;
    return (

        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {intl.get('LOGIN_LABEL_HEADER_TEXT')}
            </Typography>
            {
                error &&
                <Typography component="p" variant="subtitle2" color="error">
                    { intl.get('AUTH_ERROR_LABEL') + (_.get(error , "response.message",null) ||  _.get(error , "message") )}
                </Typography>
            }
            <form onSubmit={handleFormSubmit} className={classes.form} noValidate>
                {loginFormUI}
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label={intl.get('LOGIN_LABEL_REMEMBER_ME')}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    {intl.get('LOGIN_LABEL_HEADER_TEXT')}
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link variant="body2">
                            {intl.get('LOGIN_LABEL_FORGOT_PASSWORD')}
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link component={RouterLink} to="/signup" variant="body2">
                            {intl.get('LOGIN_LABEL_GO_TO_SIGNUP')}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>

    );
}

export default LoginForm;