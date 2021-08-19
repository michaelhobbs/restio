import {
    Badge,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Restaurant } from '../../rtk-query/api.generated';
import { Link as RouterLink } from 'react-router-dom';
import RestaurantRating from './RestaurantRating';
import { useAuth } from '../../store/hooks';
import { UserRoles } from '../../types/types';
import {
    getToReviewCreate,
    getToRestaurantDetails,
    getToReviewReply,
} from '../../utils/routes';

type Props = { restaurant: Restaurant };

export const RestaurantCard = (props: Props) => {
    const { t } = useTranslation();

    const { user: { role } = {} } = useAuth();

    const { restaurant } = props;
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardActionArea
                    component={RouterLink}
                    to={getToRestaurantDetails(restaurant)}
                >
                    <CardContent>
                        <Badge
                            color="secondary"
                            badgeContent={
                                role === UserRoles.Owner
                                    ? restaurant.pendingReplies
                                    : 0
                            }
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            max={9}
                        >
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                {restaurant.name}
                            </Typography>
                        </Badge>

                        {restaurant?.avg_rating ? (
                            <RestaurantRating rating={restaurant.avg_rating} />
                        ) : (
                            <Typography>
                                {t('restaurants.noReviews')}
                            </Typography>
                        )}
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        component={RouterLink}
                        to={getToRestaurantDetails(restaurant)}
                    >
                        {t('restaurants.viewDetails')}
                    </Button>
                    {role === UserRoles.User && (
                        <Button
                            size="small"
                            color="primary"
                            component={RouterLink}
                            to={getToReviewCreate(restaurant.id, restaurant)}
                        >
                            {t('restaurants.writeReview')}
                        </Button>
                    )}
                    {role === UserRoles.Owner && !!restaurant.pendingReplies && (
                        <Button
                            size="small"
                            color="primary"
                            component={RouterLink}
                            to={getToReviewReply(restaurant)}
                            variant="contained"
                        >
                            {t('restaurants.replyReviews')}
                        </Button>
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default RestaurantCard;
