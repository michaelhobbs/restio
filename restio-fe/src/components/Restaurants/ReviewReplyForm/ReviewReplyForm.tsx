import {
    Box,
    CircularProgress,
    IconButton,
    Typography,
} from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import { Alert, Pagination } from '@material-ui/lab';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import {
    api,
    useGetRestaurantPendingReviewsQuery,
} from '../../../rtk-query/api.generated';
import { UserRoles } from '../../../types/types';
import { RestaurantLocationProps, ROUTES } from '../../../utils/routes';
import RestaurantRating from '../RestaurantRating';
import ReviewList from '../ReviewList';

const PER_PAGE = 3;

type RestaurantDetailParams = {
    id: string;
};

export const ReviewReplyForm = (): JSX.Element => {
    const { t } = useTranslation();
    const { id } = useParams<RestaurantDetailParams>();
    const [page, setPage] = useState<number>(1);
    const [debouncedPage] = useDebounce(page, 300);
    const {
        data: { reviews, pagination } = {},
        isLoading,
        isError,
        isFetching,
        isSuccess,
    } = useGetRestaurantPendingReviewsQuery({
        restaurantId: Number(id),
        _limit: PER_PAGE,
        _page: debouncedPage - 1,
    });

    const { state: { restaurant: restaurantBase } = {} } =
        useLocation<RestaurantLocationProps>();

    const [trigger, result] = api.useLazyGetRestaurantByIdQuery();

    if (!restaurantBase && result.isUninitialized) {
        trigger({
            restaurantId: Number(id),
        });
    }

    const restaurant = restaurantBase ?? result?.data?.restaurant;

    return (
        <>
            <Box mb={2} display="flex" alignItems="flex-start">
                <IconButton
                    aria-label={t('common.back')}
                    component={RouterLink}
                    to={ROUTES.home}
                >
                    <ArrowBackIos />
                </IconButton>
                {result?.isLoading ? (
                    <CircularProgress size={20} />
                ) : (
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            {restaurant?.name}
                        </Typography>
                        {restaurant?.avg_rating ? (
                            <RestaurantRating rating={restaurant.avg_rating} />
                        ) : (
                            <Typography>
                                {t('restaurants.noReviews')}
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>

            {isLoading && <CircularProgress />}
            {isError && <Alert severity="error">{t('error.default')}</Alert>}
            {isSuccess && (
                <>
                    {reviews && (
                        <ReviewList
                            reviews={reviews}
                            variant={UserRoles.Owner}
                        />
                    )}
                </>
            )}

            {pagination && (
                <Box mt={4} mb={10}>
                    <Box justifyContent="center" display="flex">
                        <Pagination
                            count={Math.ceil(pagination.total_count / PER_PAGE)}
                            page={page}
                            onChange={(_, page) => setPage(page)}
                        />
                    </Box>
                    {isFetching && (
                        <Box my={1} justifyContent="center" display="flex">
                            <CircularProgress size={20} />
                        </Box>
                    )}
                </Box>
            )}
        </>
    );
};

export default ReviewReplyForm;
