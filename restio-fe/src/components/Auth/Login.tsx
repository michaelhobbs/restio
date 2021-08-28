import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
} from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert } from '@material-ui/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import { useLoginMutation, UserCredentials } from '../../rtk-query/api';
import { useErrorParser } from '../../utils/errors';
import { useRules } from '../../utils/forms';
import { getToSignup, LoginLocationProps, ROUTES } from '../../utils/routes';

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

export default function Login(): JSX.Element {
    const { t } = useTranslation();
    const { extractErrorMessage } = useErrorParser();
    const classes = useStyles();
    const history = useHistory();
    const { state: { from } = {} } = useLocation<LoginLocationProps>();
    const [login, { isLoading, error }] = useLoginMutation();
    const rules = useRules();

    const { handleSubmit, control } = useForm<UserCredentials>({
        reValidateMode: 'onSubmit',
    });
    const onSubmit: SubmitHandler<UserCredentials> = (data) => {
        void login({ userCredentials: data })
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
                    {t('user.login')}
                </Typography>
                {error && (
                    <Box mt={2}>
                        <Alert severity="error">
                            {extractErrorMessage(error)}
                        </Alert>
                    </Box>
                )}
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    data-testid="login-form"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue={''}
                                rules={{
                                    required: rules.required,
                                    minLength: rules?.minLength(1)?.minLength,
                                    maxLength: rules?.maxLength(100)?.maxLength,
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        autoComplete="username"
                                        autoFocus
                                        fullWidth
                                        id="name"
                                        label={t('user.name')}
                                        onChange={field.onChange}
                                        required
                                        variant="outlined"
                                        disabled={isLoading}
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue={''}
                                rules={{
                                    required: rules.required,
                                    ...rules.minLength(1),
                                    ...rules.maxLength(20),
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        autoComplete="current-password"
                                        fullWidth
                                        id="password"
                                        label={t('user.password')}
                                        onChange={field.onChange}
                                        name="password"
                                        required
                                        type="password"
                                        variant="outlined"
                                        disabled={isLoading}
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
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
                            t('user.login')
                        )}
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link
                                component={RouterLink}
                                to={getToSignup(from)}
                                variant="body2"
                            >
                                {t('auth.signup.prompt')}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
