import { Avatar, Box, Button, CircularProgress, Container, Grid, Link, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert } from '@material-ui/core';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import { UserSignUpCredentials, useSignUpMutation } from '../../rtk-query/api';
import { useErrorParser } from '../../utils/errors';
import { useRules } from '../../utils/forms';
import { getToLogin, LoginLocationProps, ROUTES } from '../../utils/routes';
import GenericInput from '../Inputs/GenericInput';
import { UserName } from '../Inputs/Users';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

type SignUpForm = UserSignUpCredentials & { confirmPassword: string };

export default function SignUp(): JSX.Element {
    const classes = useStyles();
    const { extractErrorMessage } = useErrorParser();
    const { t } = useTranslation();
    const history = useHistory();
    const { state: { from } = {} } = useLocation<LoginLocationProps>();
    const [postUser, { isLoading, error }] = useSignUpMutation();
    const rules = useRules();
    const errorPasswordsNotMatch = t('error.validation.confirmPassword');

    const methods = useForm<SignUpForm>({
        reValidateMode: 'onSubmit',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });
    const { handleSubmit, getValues } = methods;

    const onSubmit: SubmitHandler<SignUpForm> = (data) => {
        void postUser({ userSignUpCredentials: data })
            .unwrap()
            .then(() => history.replace(from ?? ROUTES.home));
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('user.signup')}
                </Typography>
                {error && (
                    <Box mt={2}>
                        <Alert severity="error">
                            {extractErrorMessage(error)}
                        </Alert>
                    </Box>
                )}
                <FormProvider<SignUpForm> {...methods}>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <UserName disabled={isLoading} />
                        <GenericInput<SignUpForm>
                            controlProps={{
                                name: 'email',
                                rules: {
                                    required: rules.required,
                                    ...rules.maxLength(100),
                                    pattern: rules.emailPattern,
                                },
                            }}
                            disabled={isLoading}
                            label={t('user.email')}
                            textFieldProps={{
                                autoComplete: 'email',
                                type: 'email',
                            }}
                        />
                        <GenericInput<SignUpForm>
                            controlProps={{
                                name: 'password',
                                rules: {
                                    required: rules.required,
                                    ...rules.minLength(1),
                                    ...rules.maxLength(20),
                                    validate: (value) => {
                                        return (
                                            (Boolean(value) &&
                                                !getValues(
                                                    'confirmPassword'
                                                )) ||
                                            getValues('confirmPassword') ===
                                                value
                                        );
                                    },
                                },
                            }}
                            disabled={isLoading}
                            label={t('user.password')}
                            textFieldProps={{
                                type: 'password',
                            }}
                        />
                        <GenericInput<SignUpForm>
                            controlProps={{
                                name: 'confirmPassword',
                                rules: {
                                    required: rules.required,
                                    ...rules.minLength(1),
                                    ...rules.maxLength(20),
                                    validate: (value) => {
                                        return (
                                            (Boolean(value) &&
                                                !getValues('password')) ||
                                            value === getValues('password') ||
                                            errorPasswordsNotMatch
                                        );
                                    },
                                },
                            }}
                            disabled={isLoading}
                            label={t('user.confirmPassword')}
                            textFieldProps={{
                                type: 'password',
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <CircularProgress color="inherit" />
                            ) : (
                                t('user.signup')
                            )}
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to={getToLogin(from)}
                                    variant="body2"
                                >
                                    {t('auth.login.prompt')}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </FormProvider>
            </div>
        </Container>
    );
}
