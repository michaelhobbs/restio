import { useMediaQuery } from '@material-ui/core';
import {
    createTheme,
    StyledEngineProvider,
    Theme,
    ThemeProvider,
} from '@material-ui/core/styles';
import { useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppSuspense from './components/AppSuspense';
import Login from './components/Auth/Login';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import SignUp from './components/Auth/Signup';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header/Header';
import Home from './components/Home';

declare module '@material-ui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}

function App(): JSX.Element {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                    primary: {
                        main: '#333',
                    },
                    secondary: {
                        main: '#ccc',
                    },
                },
            }),
        [prefersDarkMode]
    );
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <ErrorBoundary>
                    <AppSuspense>
                        <>
                            <Header />
                            <Switch>
                                <Route
                                    exact
                                    path="/signup"
                                    component={SignUp}
                                />
                                <Route exact path="/login" component={Login} />
                                <PrivateRoute path="/">
                                    <Home />
                                </PrivateRoute>
                            </Switch>
                        </>
                    </AppSuspense>
                </ErrorBoundary>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
