import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import { Pagination, Rating, ToggleButton } from '@material-ui/lab';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useGetRestaurantsQuery } from '../../../rtk-query/api';
import { useAuth } from '../../../store/hooks';
import { UserRoles } from '../../../types/types';
import { ROUTES } from '../../../utils/routes';
import RestaurantCard from '../RestaurantCard';

const PER_PAGE = 30;

export const RestaurantList = (): JSX.Element => {
    const { t } = useTranslation();
    const [filterVisible, setFilterVisible] = useState(false);
    const [ratingFilter, setRatingFilter] = useState<number | null>(null);
    const [page, setPage] = useState<number>(1);
    const [debouncedPage] = useDebounce(page, 300);
    const {
        data: { restaurants, pagination } = {},
        isLoading,
        isFetching,
    } = useGetRestaurantsQuery({
        minRating: ratingFilter || undefined,
        _limit: PER_PAGE,
        _page: debouncedPage,
    });
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const { user: { role } = {} } = useAuth();

    const toggleFilter = () => {
        setFilterVisible(!filterVisible);
    };

    return (
        <>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4" gutterBottom>
                        {`${t('restaurants.title')}  `}
                        {isFetching && <CircularProgress size={20} />}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent={'flex-end'}
                        flexDirection={isXs ? 'row-reverse' : 'row'}
                    >
                        {filterVisible && (
                            <Box mx={1} display="flex">
                                <Rating
                                    name="rating-filter"
                                    value={ratingFilter}
                                    onChange={(_, newValue) =>
                                        setRatingFilter(newValue)
                                    }
                                    disabled={isFetching}
                                />
                                {!isLoading && isFetching && (
                                    <Box mx={1}>
                                        <CircularProgress size={20} />
                                    </Box>
                                )}
                            </Box>
                        )}
                        <ToggleButton
                            value="check"
                            selected={filterVisible}
                            aria-label={t('common.filter.toggle')}
                            onChange={toggleFilter}
                            size="small"
                        >
                            <Tooltip title={t('common.filter.tooltip') ?? ''}>
                                <FilterList />
                            </Tooltip>
                        </ToggleButton>
                    </Box>
                </Grid>
                {role === UserRoles.Owner && (
                    <Box p={1} mb={2}>
                        <Button
                            variant="outlined"
                            component={RouterLink}
                            to={ROUTES.restaurantCreate}
                        >
                            {t('restaurants.create.button')}
                        </Button>
                    </Box>
                )}
            </Grid>
            {restaurants && (
                <Grid container spacing={2}>
                    {restaurants.map((restaurant) => (
                        <RestaurantCard
                            restaurant={restaurant}
                            key={restaurant.id}
                        />
                    ))}
                </Grid>
            )}

            {pagination && pagination.total_count > PER_PAGE && (
                <Box my={4} justifyContent="center" display="flex">
                    <Pagination
                        count={Math.ceil(pagination.total_count / PER_PAGE)}
                        page={page}
                        onChange={(_, page) => setPage(page)}
                    />
                </Box>
            )}
        </>
    );
};

export default RestaurantList;
