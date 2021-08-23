import { Box, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

type RatingProps = {
    rating: number;
};

export const RestaurantRating = ({ rating }: RatingProps): JSX.Element => {
    return (
        <Box display="flex" alignItems="center">
            <Rating defaultValue={rating} readOnly />
            <Box ml={1} display="flex">
                <Typography
                    variant="body2"
                    component="span"
                    color="textSecondary"
                >
                    {`${rating} / 5`}
                </Typography>
            </Box>
        </Box>
    );
};

export default RestaurantRating;
