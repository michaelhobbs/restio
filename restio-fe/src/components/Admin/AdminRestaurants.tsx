import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';
import {
    GetRestaurantsApiResponse,
    Restaurant,
    useDeleteRestaurantMutation,
    useGetRestaurantsQuery,
    useUpdateRestaurantMutation,
} from '../../rtk-query/api';
import { RestaurantName, RestaurantOwnerId } from '../Inputs/Restaurants';
import AdminSection from './AdminSection';

const AdminRestaurants: FC = () => {
    const { t } = useTranslation();

    const [deleteRestaurant, deleteStatus] = useDeleteRestaurantMutation();
    const deleteWrapper = (restaurant: Restaurant) => {
        void deleteRestaurant({ restaurantId: restaurant.id });
    };

    const getEditPayload = (id: number, restaurant: Restaurant) => ({
        restaurantId: id,
        restaurantBase: restaurant,
    });

    const columns: Column<Restaurant>[] = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id', // accessor is the "key" in the data
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Owner ID',
                accessor: 'ownerId',
            },
        ],
        []
    );

    return (
        <AdminSection
            getHook={useGetRestaurantsQuery}
            deleteWrapper={deleteWrapper}
            deleteStatus={deleteStatus}
            editHook={useUpdateRestaurantMutation}
            columns={columns}
            apiToTableData={(data: GetRestaurantsApiResponse) =>
                data.restaurants
            }
            title={`${t('admin.restaurants.title')} Auto  `}
            inputFields={[RestaurantName, RestaurantOwnerId]}
            getEditPayload={getEditPayload}
        />
    );
};

export default AdminRestaurants;
