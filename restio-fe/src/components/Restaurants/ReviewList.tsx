import { Box, Divider, Paper, Typography } from '@material-ui/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Review } from '../../rtk-query/api.generated';
import { UserRoles } from '../../types/types';
import ReplyForm from './ReplyForm';
import RestaurantReview from './RestaurantReview';

type ReviewListProps = {
    reviews: Review[];
    variant?: UserRoles.User | UserRoles.Owner;
};

export const ReviewList = ({
    reviews,
    variant = UserRoles.User,
}: ReviewListProps): JSX.Element => {
    const { t } = useTranslation();

    const title =
        variant === UserRoles.User
            ? t('restaurants.latestReviews')
            : t('restaurants.pendingReviews');
    return (
        <Box my={2}>
            <Paper>
                <Box p={2}>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Divider />
                    {reviews.map((review, idx, arr) => (
                        <Fragment key={idx}>
                            <RestaurantReview review={review} />
                            {variant === UserRoles.Owner && (
                                <ReplyForm review={review} />
                            )}
                            {arr.length - 1 !== idx && <Divider />}
                        </Fragment>
                    ))}
                </Box>
            </Paper>
        </Box>
    );
};

export default ReviewList;
