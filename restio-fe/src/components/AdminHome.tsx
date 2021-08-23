import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import AdminRestaurants from './Admin/AdminRestaurants';
import AdminReviews from './Admin/AdminReviews';
import AdminUsers from './Admin/AdminUsers';
import { NoMatch } from './NoMatch';
import PageTitle from './PageTitle';

const AdminHome = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Switch>
            <Route exact path={ROUTES.home}>
                <PageTitle title={t('admin.dashboard')}></PageTitle>
                <AdminRestaurants />
                <AdminUsers />
                <AdminReviews />
            </Route>
            <Route path="*">
                <NoMatch />
            </Route>
        </Switch>
    );
};

export default AdminHome;
