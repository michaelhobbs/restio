import { Route, Switch } from 'react-router-dom';
import AppSuspense from './components/AppSuspense';
import Login from './components/Auth/Login';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import SignUp from './components/Auth/Signup';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header/Header';
import Home from './components/Home';

function App(): JSX.Element {
    return (
        <ErrorBoundary>
            <AppSuspense>
                <>
                    <Header />
                    <Switch>
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute path="/">
                            <Home />
                        </PrivateRoute>
                    </Switch>
                </>
            </AppSuspense>
        </ErrorBoundary>
    );
}

export default App;
