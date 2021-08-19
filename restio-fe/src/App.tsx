import { Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import Header from './components/Header/Header';
import SignUp from './components/Auth/Signup';
import Home from './components/Home';
import AppSuspense from './components/AppSuspense';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
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
