import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../../store/hooks';
import { getToLogin } from '../../utils/routes';

export function PrivateRoute({ children, ...rest }: RouteProps): JSX.Element {
    const { user } = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? children : <Redirect to={getToLogin(location)} />
            }
        />
    );
}
