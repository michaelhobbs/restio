import { CssBaseline, useMediaQuery } from '@material-ui/core';
import { deDE, enUS } from '@material-ui/core/locale';
import {
    createTheme,
    StyledEngineProvider,
    Theme,
    ThemeProvider,
} from '@material-ui/core/styles';
import { createContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
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

export const ColorModeContext = createContext({
    toggleColorMode: () => {
        // do nothing
    },
});

function App(): JSX.Element {
    const {
        i18n: { language },
    } = useTranslation();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState<'light' | 'dark'>(
        prefersDarkMode ? 'dark' : 'light'
    );
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === 'light' ? 'dark' : 'light'
                );
            },
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme(
                {
                    palette: {
                        mode,
                        primary: {
                            main: mode === 'light' ? '#333' : '#eee',
                        },
                        secondary: {
                            main: mode === 'light' ? '#ccc' : '#666',
                        },
                    },
                },
                language.startsWith('en') ? enUS : deDE
            ),
        [mode, language]
    );
    return (
        <StyledEngineProvider injectFirst>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <ErrorBoundary>
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
                    </ErrorBoundary>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </StyledEngineProvider>
    );
}

export default App;
