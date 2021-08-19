import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import { NoMatch } from './NoMatch';
import RestaurantDetail from './Restaurants/RestaurantDetail/RestaurantDetail';
import RestaurantList from './Restaurants/RestaurantList/RestaurantList';
import ReviewForm from './Restaurants/ReviewForm/ReviewForm';

function UserHome() {
    return (
        <Switch>
            <Route exact path={ROUTES.home} component={RestaurantList} />
            <Route
                exact
                path={ROUTES.restaurantDetail}
                component={RestaurantDetail}
            />
            <Route exact path={ROUTES.review} component={ReviewForm} />
            <Route path="*">
                <NoMatch />
            </Route>
        </Switch>
    );
}

export default UserHome;
