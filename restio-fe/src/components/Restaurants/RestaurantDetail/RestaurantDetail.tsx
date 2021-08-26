import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Typography,
} from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import {
    useGetRestaurantByIdQuery,
    useGetRestaurantReviewsQuery,
} from '../../../rtk-query/api.generated';
import { useAuth } from '../../../store/hooks';
import { UserRoles } from '../../../types/types';
import {
    getToReviewCreate,
    RestaurantLocationProps,
    ROUTES,
} from '../../../utils/routes';
import RestaurantRating from '../RestaurantRating';
import ReviewHighlights from '../ReviewHighlights';
import ReviewList from '../ReviewList';

const PER_PAGE = 10;
type RestaurantDetailParams = {
    id: string;
};

export const RestaurantDetail = (): JSX.Element => {
    const { t } = useTranslation();
    const { id } = useParams<RestaurantDetailParams>();

    const { state: { restaurant: restaurantBase } = {} } =
        useLocation<RestaurantLocationProps>();
    const [page, setPage] = useState<number>(1);
    const [debouncedPage] = useDebounce(page, 300);
    const {
        data: { restaurant: apiRestaurant, highestReview, lowestReview } = {},
        isLoading,
        isSuccess,
    } = useGetRestaurantByIdQuery({
        restaurantId: Number(id),
    });
    const {
        data: { reviews, pagination } = {},
        isFetching: isReviewsFetching,
    } = useGetRestaurantReviewsQuery({
        restaurantId: Number(id),
        _page: debouncedPage,
    });
    const { user: { role } = {} } = useAuth();

    const restaurant = restaurantBase ?? apiRestaurant;
    const restaurantName = restaurant?.name;
    const restaurantAvgRating = restaurant?.avg_rating;
    const hasLoadedTitle = !!restaurantName;
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
                <Box>
                    <Typography variant="h4" gutterBottom>
                        {restaurantName}
                    </Typography>
                    {hasLoadedTitle && (
                        <>
                            {restaurantAvgRating ? (
                                <RestaurantRating
                                    rating={restaurantAvgRating}
                                />
                            ) : (
                                <Typography>
                                    {t('restaurants.noReviews')}
                                </Typography>
                            )}
                        </>
                    )}
                    {role === UserRoles.User && restaurant && (
                        <Box mt={1}>
                            <Button
                                variant="outlined"
                                fullWidth
                                component={RouterLink}
                                to={getToReviewCreate(Number(id), restaurant)}
                            >
                                {t('restaurants.writeReview')}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>

            {isLoading && <CircularProgress />}

            {isSuccess && restaurant && (
                <Box>
                    <ReviewHighlights
                        highestReview={highestReview}
                        lowestReview={lowestReview}
                    />
                    {reviews && <ReviewList reviews={reviews} />}

                    {pagination && (
                        <Box mt={4} mb={10}>
                            <Box justifyContent="center" display="flex">
                                <Pagination
                                    count={Math.ceil(
                                        pagination.total_count / PER_PAGE
                                    )}
                                    page={page}
                                    onChange={(_, page) => setPage(page)}
                                />
                            </Box>
                            {isReviewsFetching && (
                                <Box
                                    my={1}
                                    justifyContent="center"
                                    display="flex"
                                >
                                    <CircularProgress size={20} />
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>
            )}
        </>
    );
};

export default RestaurantDetail;
