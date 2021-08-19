import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import { NoMatch } from './NoMatch';
import RestaurantCreateForm from './Restaurants/RestaurantCreateForm/RestaurantCreateForm';
import RestaurantDetail from './Restaurants/RestaurantDetail/RestaurantDetail';
import RestaurantList from './Restaurants/RestaurantList/RestaurantList';
import ReviewReplyForm from './Restaurants/ReviewReplyForm/ReviewReplyForm';

function OwnerHome() {
    return (
        <>
            <Switch>
                <Route exact path={ROUTES.home} component={RestaurantList} />
                <Route
                    exact
                    path={ROUTES.restaurantCreate}
                    component={RestaurantCreateForm}
                />
                <Route
                    exact
                    path={ROUTES.restaurantDetail}
                    component={RestaurantDetail}
                />
                <Route
                    exact
                    path={ROUTES.reviewReply}
                    component={ReviewReplyForm}
                />
                <Route path="*">
                    <NoMatch />
                </Route>
            </Switch>
        </>
    );
}

export default OwnerHome;
